import React from 'react';

export function Sidebar({ categories, activeCatId, onSelect, searchQuery, onSearch }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Software<br />Taxonomy</h1>
        <p className="app-subtitle">Attribute dictionary</p>
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            className="search-input"
            placeholder="Search categories, traits…"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearch('')}>✕</button>
          )}
        </div>
      </div>

      <nav className="cat-nav">
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
      </nav>

      <div className="sidebar-footer">
        <span>{categories.length} of 12 categories</span>
      </div>
    </aside>
  );
}
