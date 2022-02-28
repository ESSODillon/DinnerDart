import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navigation">
      <nav className="navigation__nav">
        <h1 className="heading-logo">
          Dinner <span className="heading-logo--orange">Dart</span>
        </h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}
