import { useState, useRef, useEffect, FC, FormEvent } from "react";
import Recipe from "./ClaudeRecipe";
import Ingredients from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import { getRecipeFromGemini } from "../gemini";

// Define props interface
interface MainProps {
  selectedModel: "claude" | "gemini";
}

// Define component with types
const Main: FC<MainProps> = ({ selectedModel }) => {
  // Type the state hooks
  const [ingredients, updateIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Type the ref
  const recipeSection = useRef<HTMLDivElement | null>(null);

  // Type the event handler
  const addIngredient = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient")?.toString().trim();

    if (newIngredient) {
      updateIngredients((prevIng) => [...prevIng, newIngredient]);
      e.currentTarget.reset();
    }
  };

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  // Type the async function
  const getRecipe = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setRecipe("Generating recipe...");

      console.log("Using model:", selectedModel); // Debug log

      let recipeMarkdown: string;
      if (selectedModel === "gemini") {
        recipeMarkdown = await getRecipeFromGemini(ingredients);
      } else if (selectedModel === "claude") {
        recipeMarkdown = await getRecipeFromMistral(ingredients);
      } else {
        recipeMarkdown = "Invalid model selected";
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
  };

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
};

export default Main;
