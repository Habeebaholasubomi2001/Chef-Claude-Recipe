import { FC, RefObject } from "react";

// Define the props interface
interface IngredientsListProps {
  ingredients: string[];
  getRecipe: () => Promise<void>;
  recipeSection: RefObject<HTMLDivElement>;
}

// Use the interface with FC type
const IngredientsList: FC<IngredientsListProps> = ({
  ingredients,
  getRecipe,
  recipeSection,
}) => {
  const ingredientsListItems = ingredients.map((ing, index) => {
    return <li key={index}>{ing}</li>;
  });

  return (
    <>
      <section className="container">
        <h2 className="ing">Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientsListItems}
        </ul>
        {ingredients.length > 3 && (
          <div className="get-recipe-container">
            <div ref={recipeSection}>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={getRecipe}>Get a recipe</button>
          </div>
        )}
      </section>
    </>
  );
};

export default IngredientsList;
