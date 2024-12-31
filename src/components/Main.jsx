import { useState, useRef, useEffect } from "react";
import Recipe from "./ClaudeRecipe";
import Ingredients from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import { getRecipeFromGemini } from "../gemini";
import { getRecipeFromSpoonacular } from "../spoonacular";

export default function Main({ selectedModel }) {
  const [ingredients, updateIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recipeSection = useRef(null);

  const addIngredient = function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient").trim();

    if (newIngredient) {
      updateIngredients((prevIng) => [...prevIng, newIngredient]);
      e.target.reset(); // Clear the form
    }
  };

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    try {
      setIsLoading(true);
      setRecipe("Generating recipe...");

      console.log("Using model:", selectedModel); // Debug log

      let recipeMarkdown;
      if (selectedModel === "gemini") {
        recipeMarkdown = await getRecipeFromGemini(ingredients);
      } else if (selectedModel === "claude") {
        recipeMarkdown = await getRecipeFromMistral(ingredients);
      } else if (selectedModel === "spoonacular") {
        recipeMarkdown = await getRecipeFromSpoonacular(ingredients);
      }

      if (recipeMarkdown.includes("Sorry, there was an error")) {
        throw new Error("API Error");
      }
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error("Recipe generation error:", error);
      setRecipe(
        "Sorry, there was an error generating your recipe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container main">
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          name="ingredient"
          aria-label="Add Ingredient"
          placeholder="e.g oregano"
          required
        />
        <button type="submit">Add Ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <Ingredients
          ingredients={ingredients}
          getRecipe={getRecipe}
          recipeSection={recipeSection}
        />
      )}

      {recipe && <Recipe recipe={recipe} isLoading={isLoading} />}
    </main>
  );
}
