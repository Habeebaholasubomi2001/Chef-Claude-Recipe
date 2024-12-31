import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Intro from "./components/intro";

function App() {
  const [selectedModel, setSelectedModel] = useState("claude");

  const handleModelChange = (model) => {
    console.log("Model changed to:", model); // Debug log
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
}

export default App;
