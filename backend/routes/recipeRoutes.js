import express from 'express';
import recipeLoader from '../utils/csvLoader.mjs';

const router = express.Router();

// Ensure recipes are loaded before handling requests
await recipeLoader.loadRecipes();

router.post('/generate', async (req, res) => {
  try {
    const { mood, weather, timeOfDay, cuisineType, mealType, difficulty } = req.body;

    if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood is required'
      });
    }

    // Pass all filters to the find function
    const filters = { cuisineType, mealType, difficulty, weather, timeOfDay };
    let matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), filters);

    // If no specific matches, broaden the search to just the mood
    if (matchingRecipes.length === 0) {
      console.log('No recipes match all filters. Trying mood-only search...');
      matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {});
      
      // If still no matches, return a 404 or a random recipe as a last resort
      if (matchingRecipes.length === 0) {
        console.log('No recipes found for mood. Returning any random recipe.');
        const anyRecipe = recipeLoader.getRandomRecipe(recipeLoader.recipes);
        if (anyRecipe) {
          return res.json(anyRecipe);
        }
        return res.status(404).json({ error: 'No recipes found for that mood or in the dataset.' });
      }
    }

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
