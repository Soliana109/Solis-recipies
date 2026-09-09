import React from "react";
import { BookHeart } from "lucide-react";
import logo from "../assets/recipes/logo.png";

export default function Header({ favoriteCount, showFavoritesOnly, onToggleFavoritesView }) {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="" className="header-logo" />
        <div>
          <h1 className="header-title">Soli's Recipies</h1>
          <p className="header-tagline">Welcome!</p>
        </div>
      </div>

      <div className="header-actions">
        <a href="#" className="home-link" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
          Home
        </a>

        <button
          onClick={onToggleFavoritesView}
          className={`favorites-toggle${showFavoritesOnly ? " favorites-toggle--active" : ""}`}
        >
          <BookHeart size={16} />
          {showFavoritesOnly ? "Viewing saved" : "My saved recipes"}
          <span className="favorites-count">{favoriteCount}</span>
        </button>
      </div>
    </header>
  );
}
