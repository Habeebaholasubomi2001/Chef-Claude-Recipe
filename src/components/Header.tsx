import { FC } from "react";
import chefClaudeLogo from "../components/images/Chef-Claude-Icon.png";

interface HeaderProps {
  selectedModel: "claude" | "gemini";
  handleModelChange: (model: "claude" | "gemini") => void;
}

const Header: FC<HeaderProps> = ({ selectedModel, handleModelChange }) => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="logo-box">
          <img src={chefClaudeLogo} alt="Chef Claude Icon" />
          <h3>Chef Claude</h3>
        </div>
        <div className="model-box">
          <h5>Select AI Model: </h5>
          <div className="model-buttons">
            <button
              className={`claude-btn ${
                selectedModel === "claude" ? "active" : ""
              }`}
              onClick={() => handleModelChange("claude")}
            >
              Claude API
            </button>
            <button
              className={`gemini-btn ${
                selectedModel === "gemini" ? "active" : ""
              }`}
              onClick={() => handleModelChange("gemini")}
            >
              Gemini API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
