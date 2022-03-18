import { Link } from "react-router-dom";
import { useState } from "react";

// Images
import Tray from "../assets/food-tray.svg";
import Bag from "../assets/shopping-bag.svg";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);

  const toggleNav = () => {
    if (activeNav) {
      setActiveNav(false);
    } else {
      setActiveNav(true);
    }
  };

  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
        checked={activeNav}
        onChange={toggleNav}
      ></input>

      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <h1 className="heading-logo">
        <img
          src={Tray}
          alt={"Dinner Dart logo"}
          className="heading-logo--tray"
        />
        Dinner <span className="heading-logo--orange">Dart</span>
      </h1>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item" id="navi-link" onClick={toggleNav}>
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__item" id="navi-link" onClick={toggleNav}>
            <Link to="/about" className="navigation__link">
              About
            </Link>
          </li>
          <li className="navigation__item" id="navi-link" onClick={toggleNav}>
            <Link to="/login" className="navigation__link">
              Login
            </Link>
          </li>
          <li className="navigation__item" id="navi-link" onClick={toggleNav}>
            <Link to="/signup" className="navigation__link">
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      <Link to="/cart">
        <div className="navigation__bag">
          <img src={Bag} alt="Shopping bag" className="navigation__bag--icon" />
        </div>
      </Link>
    </div>
  );
}