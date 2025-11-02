// backend/routes/userRoutes.js
import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's saved recipes - FIXED
router.get('/recipes', auth, async (req, res) => {
  try {
    console.log('📥 Fetching saved recipes for user:', req.user.id);
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User found, saved recipes:', user.savedRecipes?.length || 0);
    res.json({
      savedRecipes: user.savedRecipes || []
    });
  } catch (error) {
    console.error('❌ Error fetching saved recipes:', error);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

// Save a recipe - FIXED
router.post('/recipes', auth, async (req, res) => {
  try {
    const { recipeId, recipeData } = req.body;
    
    console.log('💾 Saving recipe for user:', req.user.id);
    console.log('📝 Recipe data:', { recipeId, dishName: recipeData?.dishName });
    
    if (!recipeId || !recipeData) {
      return res.status(400).json({ error: 'Recipe ID and data are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize savedRecipes array if it doesn't exist
    if (!user.savedRecipes) {
      user.savedRecipes = [];
    }

    // Check if recipe is already saved
    const alreadySaved = user.savedRecipes.some(recipe => 
      recipe.id === recipeId || recipe._id === recipeId
    );

    if (alreadySaved) {
      return res.status(409).json({ error: 'Recipe already saved' });
    }

    // Add recipe to saved recipes
    user.savedRecipes.push({
      id: recipeId,
      ...recipeData,
      savedAt: new Date()
    });

    await user.save();
    console.log('✅ Recipe saved successfully');

    res.json({
      message: 'Recipe saved successfully',
      savedRecipes: user.savedRecipes
    });
  } catch (error) {
    console.error('❌ Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

export default router;