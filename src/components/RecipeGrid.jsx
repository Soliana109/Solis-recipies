import React from "react";
import RecipeCard from "./RecipeCard";
import CardSkeleton from "./CardSkeleton";

export default function RecipeGrid({
  meals,
  loading,
  favorites,
  onToggleFavorite,
  onOpen,
  showFavoritesOnly,
}) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">
          {showFavoritesOnly ? "Nothing saved yet" : "No recipes to show"}
        </p>
        <p className="empty-state-body">
          {showFavoritesOnly
            ? "Tap the heart on any recipe to add it here."
            : "Try a different search term or category."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          isFavorite={!!favorites[meal.idMeal]}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
          tilt={0}
        />
      ))}
    </div>
  );
}
