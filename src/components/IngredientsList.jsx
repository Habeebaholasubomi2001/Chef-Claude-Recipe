export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ing, index) => {
    return <li key={index}>{ing}</li>;
  });

  return (
    <>
      <section className="container">
        <h2 className="ing">Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientsListItems}
        </ul>
        {props.ingredients.length > 3 && (
          <div className="get-recipe-container">
            <div ref={props.recipeSection}>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={props.getRecipe}>Get a recipe</button>
          </div>
        )}
      </section>
    </>
  );
}
