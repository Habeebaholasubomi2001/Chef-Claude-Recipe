import chefClaudeLogo from "./images/Chef Claude Icon.png";

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <img src={chefClaudeLogo} alt="Chef Claude Icon" />
        <h3>Chef Claude</h3>
      </div>
    </div>
  );
}
