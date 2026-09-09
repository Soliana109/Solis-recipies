import React from "react";

export default function CategoryChips({ categories, selectedCategory, onSelect }) {
  const apiCategories = categories.map((category) => category.strCategory);
  const chips = ["All", "Ethiopian", "Western", ...apiCategories].filter(
    (category, index, allCategories) => allCategories.indexOf(category) === index
  );

  return (
    <div className="chips">
      {chips.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`chip${selectedCategory === cat ? " chip--active" : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
