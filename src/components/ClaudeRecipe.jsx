import ReactMarkdown from "react-markdown";

export default function Recipe({ recipe, isLoading }) {
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
}
