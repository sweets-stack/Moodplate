// backend/utils/csvLoader.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RecipeLoader {
  constructor() {
    this.recipes = [];
    this.initialized = false;
  }

  async loadRecipes() {
    return new Promise((resolve, reject) => {
      const results = [];
      const csvPath = path.join(__dirname, '../../data/recipes_dataset.csv');

      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => {
          const parsedRecipe = this.parseRecipe(data);
          if (parsedRecipe) {
            results.push(parsedRecipe);
          }
        })
        .on('end', () => {
          this.recipes = results;
          this.initialized = true;
          console.log('Loaded ' + this.recipes.length + ' recipes from CSV');
          if (this.recipes.length > 0) {
             console.log('Sample recipe loaded:', this.recipes[0].dishName);
          }
          resolve();
        })
        .on('error', (error) => {
          console.error('Error loading recipes from CSV:', error.message);
          this.recipes = [];
          reject(error);
        });
    });
  }

  parseRecipe(rawRecipe) {
    try {
        const parseJsonField = (jsonString) => {
            if (!jsonString || typeof jsonString !== 'string') return [];
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                console.warn('Failed to parse JSON for:', rawRecipe.dish_name);
                return [];
            }
        };

        const ingredients = parseJsonField(rawRecipe.ingredients_json);
        const steps = parseJsonField(rawRecipe.steps_json);
        const tags = (rawRecipe.tags || '').split(',').map(tag => tag.trim()).filter(Boolean);
        const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '').trim();
        
        return {
            dishName: rawRecipe.dish_name || 'Unknown Dish',
            description: rawRecipe.description || 'A delicious recipe',
            ingredients: ingredients,
            steps: steps,
            prepTimeMin: parseInt(rawRecipe.prep_time_min, 10) || 0,
            cookTimeMin: parseInt(rawRecipe.cook_time_min, 10) || 0,
            servings: parseInt(rawRecipe.servings, 10) || 4,
            difficulty: capitalize(rawRecipe.difficulty || 'Medium'),
            cuisineType: capitalize(rawRecipe.cuisine_type || 'International'),
            mealType: capitalize(rawRecipe.meal_type || 'Main'),
            tags: tags,
            mood: (rawRecipe.mood || 'happy').trim().toLowerCase(),
            weatherSuggestion: (rawRecipe.weather_suggestion || 'any').trim().toLowerCase(),
            timeSuggestion: (rawRecipe.time_suggestion || 'any').trim().toLowerCase(),
            imageUrl: 'https://source.unsplash.com/800x600/?' + encodeURIComponent(rawRecipe.dish_name || 'food') + ',food'
        };
    } catch (error) {
        console.error('Error parsing recipe row:', rawRecipe.dish_name, error);
        return null;
    }
  }
  
  findRecipesByMood(mood, filters = {}) {
    // Start with recipes that match the primary mood
    let filteredRecipes = this.recipes.filter(recipe => recipe.mood.toLowerCase() === mood.toLowerCase());

    // --- STRICT FILTERING LOGIC ---
    if (filters.cuisineType) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.cuisineType.toLowerCase() === filters.cuisineType.toLowerCase()
      );
    }
    if (filters.mealType) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.mealType.toLowerCase() === filters.mealType.toLowerCase()
      );
    }
    if (filters.difficulty) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }
    if (filters.weather) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.weatherSuggestion.toLowerCase() === filters.weather.toLowerCase() || recipe.weatherSuggestion === 'any'
      );
    }
    if (filters.timeOfDay) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.timeSuggestion.toLowerCase() === filters.timeOfDay.toLowerCase() || recipe.timeSuggestion === 'any'
      );
    }

    return filteredRecipes;
  }

  getRandomRecipe(recipes) {
    if (!recipes || recipes.length === 0) return null;
    return recipes[Math.floor(Math.random() * recipes.length)];
  }

  getAllCuisineTypes() {
    return [...new Set(this.recipes.map(recipe => recipe.cuisineType).filter(Boolean))].sort();
  }

  getAllMealTypes() {
    return [...new Set(this.recipes.map(recipe => recipe.mealType).filter(Boolean))].sort();
  }

  getAllDifficulties() {
    return [...new Set(this.recipes.map(recipe => recipe.difficulty).filter(Boolean))].sort();
  }

  getAllMoods() {
    return [...new Set(this.recipes.map(recipe => recipe.mood).filter(Boolean))].sort();
  }
}

const recipeLoader = new RecipeLoader();
export default recipeLoader;