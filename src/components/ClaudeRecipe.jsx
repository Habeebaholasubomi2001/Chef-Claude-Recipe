import ReactMarkdown from "react-markdown";

export default function Recipe(props) {
  return (
    <>
      <section className="suggested-recipe-container" aria-live="polite">
        <h2 className="chef">Chef Claude Recommends:</h2>
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
      </section>
    </>
  );
}
