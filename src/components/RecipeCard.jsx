import React from "react";
import { Heart, Globe2 } from "lucide-react";

export default function RecipeCard({ meal, isFavorite, onToggleFavorite, onOpen, tilt }) {
  return (
    <div
      className="card"
      style={{ "--tilt": `${tilt}deg` }}
      onClick={() => onOpen(meal.idMeal)}
    >
      <div className="card-image-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="card-image" loading="lazy" />

        {meal.strCategory && <span className="card-badge">{meal.strCategory}</span>}

        <button
          aria-label={isFavorite ? "Remove from saved recipes" : "Save recipe"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(meal);
          }}
          className="heart-btn"
        >
          <Heart size={16} color={isFavorite ? "green" : "green"} fill={isFavorite ? "green" : "none"} />
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-title">{meal.strMeal}</h3>
        {meal.strArea && (
          <p className="card-area">
            <Globe2 size={12} /> {meal.strArea} cuisine
          </p>
        )}
      </div>
    </div>
  );
}
