import React from "react";
import "./Header.css";
import Form from "./Form";

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <div>
          <div>
            <h1 className="header-text">
              A lifetime of discounts? It's Genius.
            </h1>
            <p>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free account
            </p>
          </div>
          <button type="button" className="header-btn">
            Sign in/Register
          </button>
        </div>
      </div>
      <Form />
    </div>
  );
}

export default Header;
