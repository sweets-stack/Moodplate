import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Builds a creative prompt for recipe generation with mood-specific instructions
 */
export function buildRecipePrompt(options) {
  const { mood, weather, timeOfDay } = options;
  
  const moodDescriptions = {
    happy: "Create a bright, colorful, and uplifting recipe that brings joy and happiness",
    cozy: "Create a warm, comforting recipe that feels like a hug in a bowl",
    energetic: "Create an energizing, nutrient-packed recipe that boosts energy levels",
    relaxed: "Create a calming, easy-to-make recipe that promotes relaxation",
    excited: "Create an exciting, flavorful recipe with surprising elements",
    celebratory: "Create a festive, impressive recipe perfect for celebrations",
    cold: "Create a warming, hearty recipe that helps combat cold feelings",
    warm: "Create a light, refreshing recipe that cools and refreshes"
  };

  const moodInstruction = moodDescriptions[mood.toLowerCase()] || 
    `Create a recipe that perfectly matches the ${mood} mood`;

  let context = moodInstruction;
  
  if (weather) {
    const weatherContext = {
      sunny: "perfect for a sunny day",
      cloudy: "comforting for a cloudy day", 
      rainy: "cozy for a rainy day",
      snowy: "warming for a snowy day",
      windy: "substantial for a windy day"
    };
    context += `. This recipe should be ${weatherContext[weather] || `appropriate for ${weather} weather`}`;
  }
  
  if (timeOfDay) {
    const timeContext = {
      morning: "perfect for starting the day",
      afternoon: "ideal for a midday meal",
      evening: "wonderful for winding down",
      night: "great for a late-night treat"
    };
    context += `. It should be ${timeContext[timeOfDay] || `suitable for ${timeOfDay}`}`;
  }

  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a creative chef and recipe creator. Generate unique, varied recipes based on mood, weather, and time of day.
        
IMPORTANT INSTRUCTIONS:
- Create DIFFERENT recipes each time, even for the same mood
- Be creative and vary the cuisine types (Italian, Asian, Mexican, Mediterranean, etc.)
- Vary the dish types (salads, soups, mains, desserts, drinks, etc.)
- Include specific, realistic ingredients and measurements
- Make recipes achievable for home cooks
- Ensure each recipe is unique and not repetitive`
      },
      {
        role: "user",
        content: `Create a recipe with these parameters:
- Mood: ${mood}
- Weather: ${weather || 'not specified'}
- Time of Day: ${timeOfDay || 'not specified'}

${context}

Please respond with a JSON object in this exact format:
{
  "dishName": "Creative dish name",
  "description": "Appetizing description",
  "ingredients": [
    {"name": "ingredient name", "qty": "quantity", "unit": "unit", "note": "optional note"}
  ],
  "steps": ["step 1", "step 2", "step 3"],
  "cookTimeMin": number,
  "prepTimeMin": number,
  "tags": ["tag1", "tag2", "tag3"]
}`
      }
    ],
    temperature: 0.9, // High temperature for variety
    max_tokens: 1500,
    top_p: 0.95
  };
}

/**
 * Generates a recipe using OpenAI API
 */
export async function generateRecipe(options) {
  try {
    const { mood, weather, timeOfDay } = options;
    
    console.log(`Generating recipe for: mood=${mood}, weather=${weather}, time=${timeOfDay}`);
    
    const prompt = buildRecipePrompt({ mood, weather, timeOfDay });
    const completion = await openai.chat.completions.create(prompt);
    
    const recipeText = completion.choices[0].message.content;
    const recipe = parseRecipeResponse(recipeText);
    
    // Add image URL based on dish name
    recipe.imageUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(recipe.dishName)}`;
    
    return recipe;
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your configuration.');
    }
    
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your billing.');
    }
    
    if (error.code === 'rate_limit_exceeded') {
      throw new Error('OpenAI rate limit exceeded. Please wait a moment.');
    }
    
    throw new Error(`Recipe generation failed: ${error.message}`);
  }
}

/**
 * Parses and validates the recipe response from OpenAI
 */
export function parseRecipeResponse(response) {
  try {
    // Extract JSON from response (in case there's extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : response;
    
    const recipe = JSON.parse(jsonString);
    
    // Validate required fields
    const required = ['dishName', 'description', 'ingredients', 'steps'];
    for (const field of required) {
      if (!recipe[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate arrays
    if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
      throw new Error('Ingredients must be a non-empty array');
    }
    
    if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
      throw new Error('Steps must be a non-empty array');
    }
    
    // Ensure numeric times
    recipe.prepTimeMin = Number(recipe.prepTimeMin) || 10;
    recipe.cookTimeMin = Number(recipe.cookTimeMin) || 15;
    
    // Ensure tags array
    if (!Array.isArray(recipe.tags)) {
      recipe.tags = ['homemade', 'delicious'];
    }
    
    return recipe;
    
  } catch (error) {
    console.error('Recipe parsing error:', error);
    console.error('Raw response:', response);
    throw new Error(`Failed to parse recipe: ${error.message}`);
  }
}