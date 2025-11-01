import express from 'express';
import recipeLoader from '../utils/csvLoader.mjs';

const router = express.Router();

// Ensure recipes are loaded before handling requests
await recipeLoader.loadRecipes();

// routes/recipes.ts
router.post('/generate', async (req, res) => {
  try {
    const { mood, weather, timeOfDay, cuisineType, mealType, difficulty } = req.body;

    if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood is required'
      });
    }

    console.log('Received filters:', { mood, cuisineType, mealType, difficulty, weather, timeOfDay });

    // Start with mood-based filtering
    let matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {});

    console.log(`Found ${matchingRecipes.length} recipes for mood: ${mood}`);

    // Apply additional filters
    if (cuisineType && cuisineType !== '') {
      console.log(`Filtering by cuisine: ${cuisineType}`);
      matchingRecipes = matchingRecipes.filter(recipe => 
        recipe.cuisineType?.toLowerCase() === cuisineType.toLowerCase()
      );
      console.log(`After cuisine filter: ${matchingRecipes.length} recipes`);
    }

    if (mealType && mealType !== '') {
      console.log(`Filtering by meal type: ${mealType}`);
      matchingRecipes = matchingRecipes.filter(recipe => 
        recipe.mealType?.toLowerCase() === mealType.toLowerCase()
      );
      console.log(`After meal type filter: ${matchingRecipes.length} recipes`);
    }

    if (difficulty && difficulty !== '') {
      console.log(`Filtering by difficulty: ${difficulty}`);
      matchingRecipes = matchingRecipes.filter(recipe => 
        recipe.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
      console.log(`After difficulty filter: ${matchingRecipes.length} recipes`);
    }

    if (weather && weather !== '') {
      console.log(`Filtering by weather: ${weather}`);
      matchingRecipes = matchingRecipes.filter(recipe => 
        recipe.weatherSuggestion?.toLowerCase().includes(weather.toLowerCase())
      );
      console.log(`After weather filter: ${matchingRecipes.length} recipes`);
    }

    if (timeOfDay && timeOfDay !== '') {
      console.log(`Filtering by time of day: ${timeOfDay}`);
      matchingRecipes = matchingRecipes.filter(recipe => 
        recipe.timeSuggestion?.toLowerCase().includes(timeOfDay.toLowerCase())
      );
      console.log(`After time filter: ${matchingRecipes.length} recipes`);
    }

    // If no matches after all filters, try broader search
    if (matchingRecipes.length === 0) {
      console.log('No recipes match all filters. Trying mood-only search...');
      matchingRecipes = recipeLoader.findRecipesByMood(mood.trim(), {});
      
      if (matchingRecipes.length === 0) {
        console.log('No recipes found for mood. Returning random recipe.');
        const anyRecipe = recipeLoader.getRandomRecipe(recipeLoader.recipes);
        if (anyRecipe) {
          return res.json(anyRecipe);
        }
        return res.status(404).json({ error: 'No recipes found in the dataset.' });
      }
    }

    const recipe = recipeLoader.getRandomRecipe(matchingRecipes);
    console.log(`Returning recipe: ${recipe.dishName}, Cuisine: ${recipe.cuisineType}`);
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