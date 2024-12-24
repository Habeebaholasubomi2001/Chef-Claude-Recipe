import { useState, useRef, useEffect } from "react";
import Recipe from "./ClaudeRecipe";
import Ingredients from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, updateIngredients] = useState([]);

  const addIngredient = function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");
    updateIngredients((prevIng) => [...prevIng, newIngredient]);
  };

  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  // Button to change the get the recipe from the AI
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  return (
    <main className="container main">
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          name="ingredient"
          aria-label="Add Ingredient"
          placeholder="e.g oregano"
        />
        <button>Add Ingredients</button>
      </form>

      {ingredients.length > 0 && (
        <Ingredients
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}

// Recipe token
// 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

/**
 * Challenge: Get a recipe from the AI!
 *
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 *
 * We'll start with a mini-quiz:
 *
 * 1. Think about where the recipe response should live and how you're
 *    going to make sure it doesn't disappear between each state change in
 *    the app. (I don't mean between refreshes of your mini-browser.
 *    You don't need to save this to localStorage or anything more permanent
 *    than in React's memory for now.)
 * ANs: save the response in React state
 *
 *
 * 2. What action from the user should trigger getting the recipe?
 * When the user clicks the get a recipe button
 *
 */

/**
 * Challenge: Get a recipe from the AI!
 *
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 *
 * Using either the `getRecipeFromChefClaude` function or the
 * `getRecipeFromMistral` function, make it so that when the user
 * clicks "Get a recipe", the text response from the AI is displayed
 * in the <ClaudeRecipe> component.
 *
 * For now, just have it render the raw markdown that the AI returns,
 * don't worry about making it look nice yet. (We're going to use a
 * package that will render the markdown for us soon.)
 */
