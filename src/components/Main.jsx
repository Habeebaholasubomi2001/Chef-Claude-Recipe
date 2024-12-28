import { useState, useRef, useEffect } from "react";
import Recipe from "./ClaudeRecipe";
import Ingredients from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
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
      setRecipe("Generating recipe..."); // Loading state

      console.log("Requesting recipe for ingredients:", ingredients); // Debug log

      const recipeMarkdown = await getRecipeFromMistral(ingredients);

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
