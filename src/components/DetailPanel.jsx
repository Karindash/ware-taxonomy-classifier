import React from 'react';
import { AttrCard } from './AttrCard';

export function DetailPanel({ cat, isTagSelected, onToggle, searchQuery }) {
  if (!cat) return null;

  const highlight = (text) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="hl">{part}</mark> : part
    );
  };

  const filteredDims = searchQuery.trim()
    ? cat.dims.filter(
        (d) =>
          d.dim.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.vals.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : cat.dims;

  return (
    <div className="detail-panel">
      <div className="detail-header" style={{ '--cat-color': cat.color, '--cat-light': cat.colorLight }}>
        <div className="detail-accent" style={{ background: cat.color }} />
        <div>
          <h2 className="detail-title">{highlight(cat.name)}</h2>
          <p className="detail-desc">{highlight(cat.desc)}</p>
        </div>
        <div className="detail-badge" style={{ background: cat.colorLight, color: cat.color }}>
          {cat.dims.length} dimensions
        </div>
      </div>

      <div className="attr-section-label">
        Attribute dimensions — click any trait to add it to your system profile
      </div>

      {filteredDims.length === 0 && (
        <p className="no-results-inner">No dimensions match "{searchQuery}"</p>
      )}

      <div className="attr-grid">
        {filteredDims.map((dim) => (
          <AttrCard
            key={dim.dim}
            dim={dim.dim}
            vals={dim.vals}
            catId={cat.id}
            catColor={cat.color}
            isTagSelected={isTagSelected}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
