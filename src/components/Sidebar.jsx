import React from 'react';

export function Sidebar({
  mode,
  setMode,
  categories,
  activeCatId,
  onSelect,
  searchQuery,
  onSearch,
  prdSteps,
  currentPrdStep,
  onPrdStepSelect,
  isPrdStepComplete
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Taxonomy<br />Classifier</h1>
        <p className="app-subtitle">Build & Define</p>

        <div className="mode-tabs">
          <button
            className={`mode-tab ${mode === 'prd' ? 'active' : ''}`}
            onClick={() => setMode('prd')}
          >
            Product
          </button>
          <button
            className={`mode-tab ${mode === 'taxonomy' ? 'active' : ''}`}
            onClick={() => setMode('taxonomy')}
          >
            System
          </button>
        </div>

        {mode === 'taxonomy' && (
          <div className="search-wrap">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className="search-input"
              placeholder="Search traits…"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => onSearch('')}>✕</button>
            )}
          </div>
        )}
      </div>

      <nav className="cat-nav">
        {mode === 'taxonomy' ? (
          <>
            {categories.length === 0 && (
              <p className="no-results">No results for "{searchQuery}"</p>
            )}
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-btn ${activeCatId === cat.id ? 'active' : ''}`}
                onClick={() => onSelect(cat.id)}
                style={{ '--cat-color': cat.color }}
              >
                <span className="cat-dot" style={{ background: cat.color }} />
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.dims.length}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            {prdSteps.map((s, i) => (
              <button
                key={s.id}
                className={`cat-btn ${currentPrdStep === i ? 'active' : ''}`}
                onClick={() => onPrdStepSelect(i)}
              >
                <span className="cat-icon">{s.icon}</span>
                <span className="cat-name">{s.label}</span>
                {isPrdStepComplete(i) && <span className="cat-status">✓</span>}
              </button>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <span>{mode === 'taxonomy' ? `${categories.length} categories` : `${prdSteps.length} steps`}</span>
      </div>
    </aside>
  );
}
