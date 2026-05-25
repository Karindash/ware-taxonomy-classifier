# Software Taxonomy — Attribute Dictionary

An interactive React application for exploring and documenting software design decisions across 12 major categories.

## Features

- **12 taxonomy categories** — Architecture, SDLC, Integration, Data, Compute, Reliability, Security, Observability, Deployment, Testing, DDD, AI/ML
- **96 attribute dimensions** (8 per category) with curated trait values
- **Profile builder** — click any trait tag to add it to your system profile
- **Live search** — filter across all categories, dimensions, and trait values
- **Export** — download your system profile as JSON or copy to clipboard

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/
    taxonomy.js          # All 12 categories with dimensions and trait values
  hooks/
    useTaxonomy.js       # State management: search, selection, export
  components/
    Sidebar.jsx          # Category navigation + search
    DetailPanel.jsx      # Attribute dimension grid for active category
    AttrCard.jsx         # Individual dimension card with trait tags
    TopBar.jsx           # Profile summary bar
    ProfileModal.jsx     # Selected traits export modal
  App.jsx                # Root layout
  App.css                # All styles (design tokens + components)
```

## Extending the taxonomy

To add a new category, add an entry to `src/data/taxonomy.js` following the existing shape:

```js
{
  id: "my_category",          // unique string id
  color: "#HEXCOLOR",         // accent color
  colorLight: "#HEXLIGHT",    // light background tint
  name: "Category name",
  desc: "Short description",
  dims: [
    { dim: "Dimension name", vals: ["Value A", "Value B", "Value C"] },
    // ... up to 8 dimensions
  ]
}
```

No other changes required — the sidebar, detail panel, and profile modal all read from the data file.
