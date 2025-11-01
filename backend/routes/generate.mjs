import express from 'express';
import recipeLoader from '../utils/csvLoader.mjs';

const router = express.Router();

// Initialize recipe loader
await recipeLoader.loadRecipes();

router.post('/generate', async (req, res) => {
  try {
    const { mood, weather, timeOfDay, cuisineType, mealType, difficulty } = req.body;

    // Input validation
    if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood is required and must be a non-empty string'
      });
    }

    console.log('Finding recipe for mood:', mood, 'with filters:', { 
      cuisineType, mealType, difficulty, weather, timeOfDay 
    });

    // Find recipes matching the mood and filters
    const matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {
      cuisineType,
      mealType,
      difficulty,
      weather,
      timeOfDay
    });

    if (matchingRecipes.length === 0) {
      // Fallback: try to find recipes with similar mood or any mood
      const fallbackRecipes = recipeLoader.recipes.filter(recipe => 
        recipe.mood.toLowerCase().includes(mood.toLowerCase()) || 
        recipe.tags.some(tag => tag.toLowerCase().includes(mood.toLowerCase()))
      );

      if (fallbackRecipes.length === 0) {
        return res.status(404).json({
          error: 'No recipes found',
          message: `No recipes found for mood: ${mood}. Try a different mood like 'happy', 'cozy', or 'energetic'.`
        });
      }

      const recipe = recipeLoader.getRandomRecipe(fallbackRecipes);
      console.log('Using fallback recipe for mood:', mood);
      return res.json(recipe);
    }

    // Get a random recipe from matching ones
    const recipe = recipeLoader.getRandomRecipe(matchingRecipes);
    console.log('Found recipe:', recipe.dishName);
    
    res.json(recipe);
    
  } catch (error) {
    console.error('Recipe generation error:', error.message);
    
    res.status(500).json({
      error: 'Recipe generation failed',
      message: 'Unable to generate recipe. Please try again in a moment.'
    });
  }
});

// New endpoint to get available filter options
router.get('/filters', (req, res) => {
  try {
    const filters = {
      cuisineTypes: recipeLoader.getAllCuisineTypes(),
      mealTypes: recipeLoader.getAllMealTypes(),
      difficulties: recipeLoader.getAllDifficulties(),
      moods: [...new Set(recipeLoader.recipes.map(recipe => recipe.mood).filter(Boolean))].sort()
    };
    
    res.json(filters);
  } catch (error) {
    console.error('Error getting filters:', error);
    res.status(500).json({
      error: 'Failed to load filter options'
    });
  }
});

export default router;