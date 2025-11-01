// Add this to your recipe generation endpoint
function generateRecipeImage(dishName, mood) {
  // Use fallback image for all recipes
  return '/fallback-image.png';
  
  // Alternatively, you can use food image APIs:
  // return \https://source.unsplash.com/600x400/?\,food\;
  // return \https://foodish-api.com/api/\;
}

module.exports = { generateRecipeImage };
