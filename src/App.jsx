import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryChips from "./components/CategoryChips";
import RecipeGrid from "./components/RecipeGrid";
import DetailModal from "./components/DetailModal";

import { CUSTOM_MEALS } from "./data/customRecipes";
import {
  fetchCategories,
  fetchByFirstLetter,
  searchMeals,
  fetchByCategory,
  fetchMealById,
} from "./utils/api";

const FAVORITES_KEY = "solis-recipies-favorites";
const LETTERS = ["c", "b", "p", "s"];

export default function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [heading, setHeading] = useState("Today's picks");

  const [favorites, setFavorites] = useState({});
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const favoritesLoaded = useRef(false);

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const requestId = useRef(0);

  // Load favorites from localStorage on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      // ignore, start with no favorites
    } finally {
      favoritesLoaded.current = true;
    }
  }, []);

  // Persist favorites whenever they change (after the initial load).
  useEffect(() => {
    if (!favoritesLoaded.current) return;
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      // storage unavailable, favorites stay in-session only
    }
  }, [favorites]);

  // Load category chips once.
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const loadDefault = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError("");
    setSelectedCategory("All");
    setHeading("Today's picks");

    const results = await Promise.allSettled(
      LETTERS.map((letter) => fetchByFirstLetter(letter))
    );
    if (currentRequest !== requestId.current) return;

    const apiMeals = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : []
    );
    setMeals([...CUSTOM_MEALS, ...apiMeals]);
    setError(apiMeals.length === 0 ? "Showing local recipes while TheMealDB is unavailable." : "");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDefault();
  }, [loadDefault]);

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      loadDefault();
      return;
    }
    setShowFavoritesOnly(false);
    setSelectedCategory("All");
    setLoading(true);
    setError("");
    setHeading(`Results for "${q}"`);

    const currentRequest = ++requestId.current;
    const localMatches = CUSTOM_MEALS.filter((m) =>
      m.strMeal.toLowerCase().includes(q.toLowerCase())
    );

    searchMeals(q)
      .then((apiMeals) => {
        if (currentRequest !== requestId.current) return;
        const mealsById = new Map([...localMatches, ...apiMeals].map((meal) => [meal.idMeal, meal]));
        setMeals([...mealsById.values()]);
        setError(
          mealsById.size === 0
            ? `No recipes found for "${q}". Try a different dish or ingredient.`
            : ""
        );
      })
      .catch(() => {
        if (currentRequest !== requestId.current) return;
        setMeals(localMatches);
        setError(
          localMatches.length === 0
            ? `No recipes found for "${q}". Try a different dish or ingredient.`
            : "Showing local recipes while TheMealDB is unavailable."
        );
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });
  }

  function handleCategoryClick(catName) {
    setShowFavoritesOnly(false);
    setQuery("");

    if (catName === "All") {
      loadDefault();
      return;
    }

    setSelectedCategory(catName);
    setHeading(catName);
    setLoading(true);
    setError("");

    const currentRequest = ++requestId.current;
    const localMatches = CUSTOM_MEALS.filter((meal) => meal.strCategory === catName);
    fetchByCategory(catName)
      .then((apiMeals) => {
        if (currentRequest !== requestId.current) return;
        const mealsById = new Map([...localMatches, ...apiMeals].map((meal) => [meal.idMeal, meal]));
        setMeals([...mealsById.values()]);
        setError(mealsById.size === 0 ? `No recipes available in ${catName}.` : "");
      })
      .catch(() => {
        if (currentRequest !== requestId.current) return;
        setMeals(localMatches);
        setError(
          localMatches.length === 0
            ? `No recipes available in ${catName}.`
            : "Showing local recipes while TheMealDB is unavailable."
        );
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });
  }

  function toggleFavorite(meal) {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[meal.idMeal]) {
        delete next[meal.idMeal];
      } else {
        next[meal.idMeal] = {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory || "",
          strArea: meal.strArea || "",
        };
      }
      return next;
    });
  }

  async function openDetail(id) {
    setSelectedMeal(null);

    if (String(id).startsWith("custom-")) {
      const local = CUSTOM_MEALS.find((m) => m.idMeal === id);
      setSelectedMeal(local || null);
      setDetailLoading(false);
      return;
    }

    setDetailLoading(true);
    try {
      const meal = await fetchMealById(id);
      setSelectedMeal(meal);
    } catch (e) {
      setSelectedMeal(null);
    } finally {
      setDetailLoading(false);
    }
  }

  const favoriteList = Object.values(favorites);
  const displayedMeals = showFavoritesOnly ? favoriteList : meals;

  return (
    <div className="app">
      <div className="app-inner">
        <Header
          favoriteCount={favoriteList.length}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesView={() => setShowFavoritesOnly((v) => !v)}
        />

        <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSearch} />

        {!showFavoritesOnly && (
          <CategoryChips
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategoryClick}
          />
        )}

        <div className="results">
          <h2 className="section-heading">
            {showFavoritesOnly ? "My saved recipes" : heading}
          </h2>

          {error && !loading && <div className="error-banner">{error}</div>}

          <RecipeGrid
            meals={displayedMeals}
            loading={loading}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpen={openDetail}
            showFavoritesOnly={showFavoritesOnly}
          />
        </div>

        <footer className="footer"></footer>
      </div>

      {(selectedMeal || detailLoading) && (
        <DetailModal
          meal={selectedMeal}
          loading={detailLoading}
          isFavorite={selectedMeal ? !!favorites[selectedMeal.idMeal] : false}
          onToggleFavorite={toggleFavorite}
          onClose={() => {
            setSelectedMeal(null);
            setDetailLoading(false);
          }}
        />
      )}
    </div>
  );
}
