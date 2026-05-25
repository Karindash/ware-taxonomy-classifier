import React from 'react';

export function AttrCard({ dim, vals, catId, catColor, isTagSelected, onToggle }) {
  return (
    <div className="attr-card">
      <p className="attr-dim-label">{dim}</p>
      <div className="attr-tags">
        {vals.map((val) => {
          const selected = isTagSelected(catId, dim, val);
          return (
            <button
              key={val}
              className={`attr-tag ${selected ? 'selected' : ''}`}
              style={selected ? { '--tag-color': catColor } : {}}
              onClick={() => onToggle(catId, dim, val)}
              title={`Toggle: ${val}`}
            >
              {val}
              {selected && <span className="tag-check">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
