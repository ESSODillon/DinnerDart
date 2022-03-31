import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="nav">
        <li className="nav__item">
          <a href="#" className="nav__link">
            Register your Restaurant
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            About Us
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Order History
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Account Details
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Become a Darter
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Help
          </a>
        </li>
      </ul>
      <p className="copyright">
        &copy; Copyright 2022 website designed and developed by Dillon Polley
      </p>
    </footer>
  );
}
