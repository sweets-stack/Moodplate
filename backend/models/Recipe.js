import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    name: String,
    qty: String,
    unit: String,
    note: String
  }],
  steps: [String],
  prepTimeMin: Number,
  cookTimeMin: Number,
  servings: Number,
  difficulty: String,
  cuisineType: String,
  mealType: String,
  tags: [String],
  mood: String,
  weatherSuggestion: String,
  timeSuggestion: String,
  imageUrl: String
}, {
  timestamps: true
});

export default mongoose.model('Recipe', recipeSchema);