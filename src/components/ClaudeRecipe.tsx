import { FC } from "react";
import ReactMarkdown from "react-markdown";

interface RecipeProps {
  recipe: string;
  isLoading: boolean;
}

const Recipe: FC<RecipeProps> = ({ recipe, isLoading }) => {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2 className="chef">Chef Claude Recommends:</h2>
      {isLoading ? (
        <p>Generating your recipe...</p>
      ) : (
        <ReactMarkdown>{recipe}</ReactMarkdown>
      )}
    </section>
  );
};

export default Recipe;
