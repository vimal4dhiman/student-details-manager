import React from "react";
import "./Header.css";

const Header = ({ openForm, openRankFrom }) => {
  return (
    <header className="app-header">
      <h1>SAT Score</h1>
      <button className="create-product-button" onClick={openForm}>
        Create
      </button>
      <button className="create-product-button" onClick={openRankFrom}>
        Edit
      </button>
    </header>
  );
};

export default Header;
