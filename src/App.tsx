import { useState, FC } from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Intro from "./components/intro";

type ModelType = "claude" | "gemini";

const App: FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>("claude");

  const handleModelChange = (model: ModelType): void => {
    console.log("Model changed to:", model);
    setSelectedModel(model);
  };

  return (
    <>
      <Header
        selectedModel={selectedModel}
        handleModelChange={handleModelChange}
      />
      <Intro />
      <Main selectedModel={selectedModel} />
    </>
  );
};

export default App;
