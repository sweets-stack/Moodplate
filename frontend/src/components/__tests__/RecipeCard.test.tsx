import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecipeCard from '../RecipeCard'

const mockRecipe = {
  dishName: 'Test Dish',
  description: 'A test recipe description',
  ingredients: [
    { name: 'Flour', qty: '1', unit: 'cup' },
    { name: 'Sugar', qty: '2', unit: 'tbsp' },
  ],
  steps: ['Step 1: Mix ingredients', 'Step 2: Bake'],
  cookTimeMin: 20,
  prepTimeMin: 10,
  servings: 4,
  difficulty: 'easy',
  cuisineType: 'Test Cuisine',
  mealType: 'dinner',
  tags: ['test', 'easy'],
  mood: 'happy',
  weatherSuggestion: 'sunny',
  timeSuggestion: 'afternoon',
  imageUrl: 'test-image.jpg',
}

describe('RecipeCard', () => {
  const mockOnSave = jest.fn()
  const mockOnRegenerate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders recipe information correctly', () => {
    render(
      <RecipeCard
        recipe={mockRecipe}
        onSave={mockOnSave}
        onRegenerate={mockOnRegenerate}
        isSaved={false}
      />
    )

    expect(screen.getByText('Test Dish')).toBeInTheDocument()
    expect(screen.getByText('A test recipe description')).toBeInTheDocument()
    expect(screen.getByText('Flour')).toBeInTheDocument()
    expect(screen.getByText('1 cup')).toBeInTheDocument()
    expect(screen.getByText('Step 1: Mix ingredients')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('calls onSave when save button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <RecipeCard
        recipe={mockRecipe}
        onSave={mockOnSave}
        onRegenerate={mockOnRegenerate}
        isSaved={false}
      />
    )

    await user.click(screen.getByText('Save Recipe'))
    expect(mockOnSave).toHaveBeenCalledTimes(1)
  })

  test('disables save button when recipe is already saved', () => {
    render(
      <RecipeCard
        recipe={mockRecipe}
        onSave={mockOnSave}
        onRegenerate={mockOnRegenerate}
        isSaved={true}
      />
    )

    expect(screen.getByText('Recipe Saved!')).toBeInTheDocument()
  })
})
