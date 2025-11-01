// Recipe data sanitizer utility
export interface Ingredient {
  name: string;
  qty?: string;
  unit?: string;
  note?: string;
}

export interface Recipe {
  dishName: string;
  description: string;
  ingredients: Ingredient[] | string[];
  steps: string[];
  cookTimeMin: number;
  prepTimeMin: number;
  tags: string[];
  imageUrl: string;
  servings?: number;
  difficulty?: string;
}

// recipeSanitizer.ts
export function sanitizeRecipe(recipeData: any): Recipe {
  // Ensure ingredients are properly formatted
  let ingredients: Ingredient[] = [];
  
  if (Array.isArray(recipeData.ingredients)) {
    ingredients = recipeData.ingredients.map((ing: any) => {
      if (typeof ing === 'string') {
        return { name: ing.trim() };
      } else if (typeof ing === 'object' && ing !== null) {
        return {
          name: ing.name || ing.ingredient || 'Unknown',
          qty: ing.qty || ing.quantity || '',
          unit: ing.unit || '',
          note: ing.note || ''
        };
      }
      return { name: 'Invalid ingredient' };
    });
  }

  // Ensure steps are properly formatted
  let steps: string[] = [];
  if (Array.isArray(recipeData.steps)) {
    steps = recipeData.steps.map((step: any, index: number) => {
      if (typeof step === 'string') {
        return step;
      } else {
        return `Step ${index + 1}: ${JSON.stringify(step)}`;
      }
    });
  }

  // REMOVED: const totalTime = (recipeData.prepTimeMin || 0) + (recipeData.cookTimeMin || 0);

  return {
    dishName: recipeData.dishName || recipeData.name || 'Unknown Dish',
    description: recipeData.description || 'No description available',
    ingredients,
    steps,
    cookTimeMin: recipeData.cookTimeMin || 0,
    prepTimeMin: recipeData.prepTimeMin || 0,
    tags: Array.isArray(recipeData.tags) ? recipeData.tags : [],
    imageUrl: recipeData.imageUrl || '/fallback-image.png',
    servings: recipeData.servings || 2,
    difficulty: recipeData.difficulty || 'easy'
  };
}

export function formatIngredient(ingredient: Ingredient | string): string {
  if (typeof ingredient === 'string') {
    return ingredient;
  }
  
  let formatted = ingredient.name;
  if (ingredient.qty) {
    formatted += ` - ${ingredient.qty}`;
  }
  if (ingredient.unit) {
    formatted += ` ${ingredient.unit}`;
  }
  if (ingredient.note) {
    formatted += ` (${ingredient.note})`;
  }
  
  return formatted;
}
