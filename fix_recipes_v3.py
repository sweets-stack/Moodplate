# fix_recipes_v3.py

import csv
import json
import re

# --- CONFIGURATION ---
INPUT_FILE = 'data/recipes_dataset.csv'
OUTPUT_FILE = 'data/recipes_dataset_corrected.csv'
# --- END CONFIGURATION ---

def standardize_steps(steps_json_str):
    """Converts steps from `[{"step": "..."}]` to `["..."]`."""
    try:
        clean_str = steps_json_str.strip()
        if clean_str.startswith('"') and clean_str.endswith('"'):
            clean_str = clean_str[1:-1].replace('""', '"')

        data = json.loads(clean_str)
        if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict) and 'step' in data[0]:
            new_steps = [item['step'] for item in data]
            return json.dumps(new_steps)
        return json.dumps(data)
    except (json.JSONDecodeError, TypeError):
        # Fallback for simple, unquoted, comma-separated lists
        if not (steps_json_str.startswith('[') and steps_json_str.endswith(']')):
             steps_list = [s.strip() for s in steps_json_str.split(',') if s.strip()]
             return json.dumps(steps_list)
        return '[]' # Return empty JSON array if truly broken

def main():
    print(f"Starting to process '{INPUT_FILE}' with the final, most robust script...")

    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as infile:
            content = infile.read()
    except FileNotFoundError:
        print(f"FATAL ERROR: The input file was not found at '{INPUT_FILE}'.")
        return

    # This is the header your file MUST start with
    header_line = "dish_name,description,ingredients_json,steps_json,prep_time_min,cook_time_min,servings,difficulty,cuisine_type,meal_type,tags,mood,weather_suggestion,time_suggestion"
    header_fields = [h.strip() for h in header_line.split(',')]
    
    # Split the file content into individual recipe blocks.
    # It assumes a new recipe starts with a dish name that doesn't have leading commas.
    recipe_blocks = re.split(r'\n(?=[^,])', content.strip())
    
    corrected_rows = []

    # This regex is designed to be extremely forgiving. It will find each field individually.
    # It looks for: (Quoted Field) OR (JSON Field) OR (Simple Unquoted Field)
    csv_pattern = re.compile(r'"(\[[^\]]*\])"|"(.*?)"|([^,]+)')

    for block in recipe_blocks[1:]: # Skip the header block
        if not block.strip():
            continue
        
        # Clean up the block by removing newlines
        clean_block = block.replace('\n', ' ').strip()
        
        matches = csv_pattern.findall(clean_block)
        
        # Extracted values will be in one of the 3 capturing groups
        extracted_values = [g1 if g1 else g2 if g2 else g3 for g1, g2, g3 in matches]
        
        if len(extracted_values) < len(header_fields):
            print(f"WARNING: Salvaging malformed row. Starts with: '{extracted_values[0] if extracted_values else 'N/A'}'")
            # Pad the row with empty strings if it's too short
            extracted_values += [''] * (len(header_fields) - len(extracted_values))
        
        row_dict = dict(zip(header_fields, extracted_values))

        try:
            # --- Data Cleaning and Standardization ---
            row_dict['steps_json'] = standardize_steps(row_dict['steps_json'])
            row_dict['difficulty'] = row_dict.get('difficulty', 'Medium').strip().capitalize() or 'Medium'
            row_dict['cuisine_type'] = row_dict.get('cuisine_type', 'Unknown').strip().capitalize() or 'Unknown'
            row_dict['meal_type'] = row_dict.get('meal_type', 'Dinner').strip().capitalize() or 'Dinner'
            row_dict['mood'] = row_dict.get('mood', 'happy').strip() or 'happy'
            row_dict['weather_suggestion'] = row_dict.get('weather_suggestion', 'any').strip() or 'any'
            row_dict['time_suggestion'] = row_dict.get('time_suggestion', 'any').strip() or 'any'

            corrected_rows.append(row_dict)
        except Exception as e:
            print(f"ERROR: Could not process block for '{row_dict.get('dish_name', 'N/A')}'. Error: {e}")


    # Write the corrected data to the new CSV file
    try:
        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=header_fields, quoting=csv.QUOTE_ALL)
            writer.writeheader()
            writer.writerows(corrected_rows)

        print("-" * 30)
        print(f"SUCCESS: Processed and salvaged {len(corrected_rows)} recipes.")
        print(f"Your final, corrected file has been saved as '{OUTPUT_FILE}'")
        print("Please review the new file, then delete the old one and rename this one.")
        print("-" * 30)

    except Exception as e:
        print(f"FATAL ERROR: Could not write to output file. Reason: {e}")


if __name__ == '__main__':
    main()