export interface Ingredient {
  name: string;
  qty?: string;
  unit?: string;
  note?: string;
}

export interface Recipe {
  dishName: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTimeMin: number;
  cookTimeMin: number;
  servings: number;
  difficulty: string;
  cuisineType: string;
  mealType: string;
  tags: string[];
  mood: string;
  weatherSuggestion: string;
  timeSuggestion: string;
  imageUrl: string;
}

export interface SavedRecipe extends Recipe {
  id: string;
  savedAt: string;
}

export interface FilterOptions {
  cuisineTypes: string[];
  mealTypes: string[];
  difficulties: string[];
  moods: string[];
}

export interface RecipeFilters {
  weather?: string;
  timeOfDay?: string;
  cuisineType?: string;
  mealType?: string;
  difficulty?: string;
}
