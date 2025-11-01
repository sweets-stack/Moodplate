// Image utility functions for RecipeCard
export const getRecipeImage = (imageUrl: string | undefined, dishName: string = ''): string => {
  if (!imageUrl || imageUrl.includes('placehold.co') || imageUrl.includes('FF6B6B')) {
    // Use fallback image
    return '/fallback-image.png';
  }
  return imageUrl;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, dishName: string = ''): void => {
  const target = e.target as HTMLImageElement;
  target.src = '/fallback-image.png';
};
