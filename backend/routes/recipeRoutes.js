import express from 'express';
import recipeLoader from '../utils/csvLoader.mjs';

const router = express.Router();

// Ensure recipes are loaded before handling requests
// Top-level await is supported in ES modules
await recipeLoader.loadRecipes();

router.post('/generate', async (req, res) => {
  try {
    const { mood, ...filters } = req.body;

    if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood is required'
      });
    }

    // Use the optimized findRecipesByMood function with all filters
    let matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), filters);

    // If no recipes match the specific filters, broaden the search
    if (matchingRecipes.length === 0) {
      // Fallback 1: Find recipes matching only the mood
      matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {});
      
      // Fallback 2: If still no matches, just grab any random recipe
      if (matchingRecipes.length === 0) {
        const anyRecipe = recipeLoader.getRandomRecipe(recipeLoader.recipes);
        if (anyRecipe) {
          return res.json(anyRecipe);
        }
        // This case should be rare if the CSV is loaded
        return res.status(404).json({ error: 'No recipes found in the dataset.' });
      }
    }

    // Get a random recipe from the filtered list
    const recipe = recipeLoader.getRandomRecipe(matchingRecipes);
    res.json(recipe);
    
  } catch (error) {
    console.error('Error in /generate route:', error);
    res.status(500).json({ error: 'Recipe generation failed due to a server error.' });
  }
});

router.get('/filters', (req, res) => {
  try {
    const filters = {
      cuisineTypes: recipeLoader.getAllCuisineTypes(),
      mealTypes: recipeLoader.getAllMealTypes(),
      difficulties: recipeLoader.getAllDifficulties(),
      moods: recipeLoader.getAllMoods()
    };
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load filters' });
  }
});

export default router;
