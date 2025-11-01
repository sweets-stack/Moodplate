import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/recipes', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json(user.savedRecipes || []);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get saved recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

router.post('/recipes', protect, async (req, res) => {
  try {
    const newRecipe = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      if (!user.savedRecipes) user.savedRecipes = [];
      
      // Check if recipe already exists
      const recipeExists = user.savedRecipes.some(r => r.dishName === newRecipe.dishName);
      
      if (!recipeExists) {
        user.savedRecipes.push({
          ...newRecipe,
          savedAt: new Date()
        });
        await user.save();
        res.status(201).json(user.savedRecipes);
      } else {
        res.status(409).json({ error: 'Recipe already saved' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Save recipe error:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

router.delete('/recipes/:id', protect, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const user = await User.findById(req.user.id);

    if (user) {
      user.savedRecipes = user.savedRecipes.filter(r => r._id.toString() !== recipeId);
      await user.save();
      res.json(user.savedRecipes);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

export default router;