# Soli's Recipies

A data-driven recipe finder built with React. Pulls live recipe data from
[TheMealDB](https://www.themealdb.com/api.php) (a free, no-key-required API)
and blends in a small homemade collection of Ethiopian classics.

## Features

- **Live API search** — search any dish or ingredient
- **Category filtering** — chips pulled live from the API, plus a local
  "Ethiopian" category
- **Card-based grid** with hover motion and category tags
- **Favorites / wishlist** — heart any recipe to save it; persists across
  visits via `localStorage`
- **Recipe detail modal** — full ingredient list and instructions
- **Custom recipes** — Doro Wot, Shiro Wot, and Dinich Wot, included locally
  and searchable alongside the API results
- Loading skeletons, empty states, and error handling

## Project structure

```
solis-recipies/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── recipes/
│   │       ├── doro-wot.svg
│   │       ├── shiro-wot.svg
│   │       └── dinich-wot.svg
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryChips.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeGrid.jsx
│   │   ├── CardSkeleton.jsx
│   │   └── DetailModal.jsx
│   ├── data/
│   │   └── customRecipes.js
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Getting started

```bash
npm install
npm start
```

This runs the app in development mode at [http://localhost:3000](http://localhost:3000).

To build a production bundle:

```bash
npm run build
```

## API used

All recipe data (aside from the local Ethiopian dishes) comes from
TheMealDB's free public API:

- `GET /categories.php` — category list for the filter chips
- `GET /search.php?s=` — search by name
- `GET /search.php?f=` — browse by first letter (used for the default feed)
- `GET /filter.php?c=` — filter by category
- `GET /lookup.php?i=` — full recipe detail by id

No API key is required.
