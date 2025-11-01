import { buildRecipePrompt, parseRecipeResponse } from '../utils/openaiClient.mjs';

describe('Recipe Generation', () => {
  describe('buildRecipePrompt', () => {
    test('builds prompt with mood only', () => {
      const prompt = buildRecipePrompt({ mood: 'happy' });
      
      expect(prompt.messages).toHaveLength(2);
      expect(prompt.messages[1].content).toContain('happy');
      expect(prompt.messages[1].content).not.toContain('Weather:');
    });

    test('builds prompt with all parameters', () => {
      const prompt = buildRecipePrompt({
        mood: 'cozy',
        weather: 'rainy',
        timeOfDay: 'evening'
      });
      
      expect(prompt.messages[1].content).toContain('cozy');
      expect(prompt.messages[1].content).toContain('rainy');
      expect(prompt.messages[1].content).toContain('evening');
    });
  });

  describe('parseRecipeResponse', () => {
    test('parses valid recipe JSON', () => {
      const validRecipe = {
        dishName: "Test Dish",
        description: "A test recipe",
        ingredients: [{ name: "flour", qty: "1", unit: "cup" }],
        steps: ["Step 1", "Step 2"],
        cookTimeMin: 20,
        prepTimeMin: 10,
        tags: ["test", "easy"]
      };

      const result = parseRecipeResponse(JSON.stringify(validRecipe));
      
      expect(result.dishName).toBe("Test Dish");
      expect(result.ingredients).toHaveLength(1);
      expect(result.imageUrl).toContain('placehold.co');
    });

    test('throws error for invalid JSON', () => {
      expect(() => parseRecipeResponse('invalid json')).toThrow();
    });

    test('throws error for missing required fields', () => {
      const incompleteRecipe = {
        dishName: "Test Dish"
        // missing ingredients and steps
      };

      expect(() => parseRecipeResponse(JSON.stringify(incompleteRecipe))).toThrow();
    });
  });
});