import axios from "axios";

export async function getRecipeFromSpoonacular(ingredientsArr) {
  // Check for API key
  if (!import.meta.env.VITE_SPOONACULAR_API_KEY) {
    console.error("No API key found!");
    return "Sorry, there was an error with the API configuration.";
  }

  const ingredientsString = ingredientsArr.join(",");

  try {
    // First, search for recipes with given ingredients
    const searchResponse = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          ingredients: ingredientsString,
          number: 1, // Get just one recipe
          ranking: 2, // Maximize used ingredients
        },
      }
    );

    if (!searchResponse.data || searchResponse.data.length === 0) {
      return "Sorry, no recipes found with those ingredients.";
    }

    // Get detailed recipe information
    const recipeId = searchResponse.data[0].id;
    const detailResponse = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        },
      }
    );

    // Format the response in markdown
    const recipe = detailResponse.data;
    return `# ${recipe.title}

## Ingredients
${recipe.extendedIngredients
  .map((ing) => `- ${ing.amount} ${ing.unit} ${ing.name}`)
  .join("\n")}

## Instructions
${recipe.instructions || recipe.summary}`;
  } catch (err) {
    console.error("API Error:", err);
    if (err.response?.status === 402) {
      return "Sorry, the daily API quota has been exceeded. Please try again tomorrow.";
    }
    return "Sorry, there was an error generating your recipe. Please try again.";
  }
}
