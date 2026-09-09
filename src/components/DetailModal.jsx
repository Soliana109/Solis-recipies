import React from "react";
import { X, Heart, Globe2, Loader2, ChevronRight } from "lucide-react";
import { parseIngredients } from "../utils/api";

export default function DetailModal({ meal, loading, isFavorite, onToggleFavorite, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {loading || !meal ? (
          <div className="modal-loading">
            <Loader2 className="spin" size={28} color="#E85D93" />
          </div>
        ) : (
          <>
            <div className="modal-image-wrap">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />

              <button aria-label="Close" onClick={onClose} className="modal-close">
                <X size={18} color="green" />
              </button>

              <button
                aria-label={isFavorite ? "Remove from saved recipes" : "Save recipe"}
                onClick={() => onToggleFavorite(meal)}
                className="modal-heart"
              >
                <Heart size={18} color={isFavorite ? "green" : "green"} fill={isFavorite ? "#E85D93" : "none"} />
              </button>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{meal.strMeal}</h2>

              <div className="badges">
                {meal.strCategory && <span className="badge">{meal.strCategory}</span>}
                {meal.strArea && (
                  <span className="badge">
                    <Globe2 size={12} /> {meal.strArea}
                  </span>
                )}
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Ingredients</h3>
                <ul className="ingredients-list">
                  {parseIngredients(meal).map((it, idx) => (
                    <li key={idx} className="ingredient-item">
                      <span className="ingredient-dot" />
                      <span>
                        <span className="ingredient-measure">{it.measure} </span>
                        {it.ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Instructions</h3>
                <p className="instructions-text">{meal.strInstructions}</p>
              </div>

              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="video-link">
                  Watch video <ChevronRight size={14} />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
