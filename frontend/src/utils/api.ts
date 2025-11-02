/// <reference types="vite/client" />

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://moodplate-backend.onrender.com'

export interface GenerateRecipeRequest {
  mood: string
  weather?: string
  timeOfDay?: string
}

export interface GenerateRecipeResponse {
  dishName: string
  description: string
  ingredients: Array<{
    name: string
    qty?: string
    unit?: string
    note?: string
  }>
  steps: string[]
  cookTimeMin: number
  prepTimeMin: number
  tags: string[]
  imageUrl: string
}

export async function generateRecipe(
  data: GenerateRecipeRequest
): Promise<GenerateRecipeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to generate recipe')
  }

  return response.json()
}