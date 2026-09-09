const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories.php`);
  const data = await res.json();
  return data.categories || [];
}

export async function fetchByFirstLetter(letter) {
  const res = await fetch(`${API_BASE}/search.php?f=${letter}`);
  const data = await res.json();
  return data.meals || [];
}

export async function searchMeals(query) {
  const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchByCategory(categoryName) {
  const res = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(categoryName)}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id) {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return (data.meals || [])[0] || null;
}

export function parseIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      items.push({ ingredient: ing.trim(), measure: measure ? measure.trim() : "" });
    }
  }
  return items;
}
