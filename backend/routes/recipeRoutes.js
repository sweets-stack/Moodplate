import express from 'express';
import recipeLoader from '../utils/csvLoader.mjs';

const router = express.Router();

// Load recipes when server starts
let recipesLoaded = false;

const ensureRecipesLoaded = async (req, res, next) => {
  if (!recipesLoaded) {
    try {
      await recipeLoader.loadRecipes();
      recipesLoaded = true;
      console.log('✅ Recipes loaded successfully');
      next();
    } catch (error) {
      console.error('❌ Failed to load recipes:', error);
      return res.status(500).json({ error: 'Failed to load recipes database' });
    }
  } else {
    next();
  }
};

// Apply to all routes
router.use(ensureRecipesLoaded);

// GENERATE RECIPE ENDPOINT - FIXED PATH
router.post('/generate', async (req, res) => {
  try {
    const { mood, weather, timeOfDay, cuisineType, mealType, difficulty } = req.body;

    console.log('📝 Recipe generation request:', { mood, weather, timeOfDay, cuisineType, mealType, difficulty });

    if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood is required'
      });
    }

    // Pass all filters to the find function
    const filters = { cuisineType, mealType, difficulty, weather, timeOfDay };
    let matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), filters);

    console.log(`🔍 Found ${matchingRecipes.length} recipes with filters`);

    // If no specific matches, broaden the search to just the mood
    if (matchingRecipes.length === 0) {
      console.log('No recipes match all filters. Trying mood-only search...');
      matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {});
      
      console.log(`🔍 Found ${matchingRecipes.length} recipes with mood only`);
      
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
    console.log('🎉 Selected recipe:', recipe.name);
    
    res.json(recipe);
    
  } catch (error) {
    console.error('❌ Error in /generate route:', error);
    res.status(500).json({ 
      error: 'Recipe generation failed due to a server error.',
      message: error.message 
    });
  }
});

// GET FILTERS ENDPOINT
router.get('/filters', (req, res) => {
  try {
    const filters = {
      cuisineTypes: recipeLoader.getAllCuisineTypes(),
      mealTypes: recipeLoader.getAllMealTypes(),
      difficulties: recipeLoader.getAllDifficulties(),
      moods: recipeLoader.getAllMoods()
    };
    
    console.log('📊 Sending filter options');
    res.json(filters);
  } catch (error) {
    console.error('❌ Error in /filters route:', error);
    res.status(500).json({ 
      error: 'Failed to load filters',
      message: error.message 
    });
  }
});

// GET ALL RECIPES (for testing)
router.get('/all', (req, res) => {
  try {
    res.json({
      total: recipeLoader.recipes.length,
      recipes: recipeLoader.recipes.slice(0, 10) // First 10 for preview
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load recipes' });
  }
});

export default router;