// utils/localStorage.ts
import { SavedRecipe } from '../types/recipe'

const STORAGE_KEY = 'moodplate_saved_recipes'

export function saveRecipe(recipe: SavedRecipe): void {
  const saved = getSavedRecipes()
  const updated = [...saved.filter(r => r.id !== recipe.id), recipe]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getSavedRecipes(): SavedRecipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function deleteSavedRecipe(id: string): void {
  const saved = getSavedRecipes()
  const updated = saved.filter(recipe => recipe.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}