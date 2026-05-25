import React, { useState } from 'react';

export function ProfileModal({ profile, onClose, onClear }) {
  const [copied, setCopied] = useState(false);

  const jsonStr = JSON.stringify(profile, null, 2);
  const entries = Object.entries(profile);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-design-profile.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">System design profile</h2>
            <p className="modal-sub">Your selected attribute values across all categories</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {entries.length === 0 ? (
            <p className="modal-empty">No attributes selected yet. Go back and click trait tags to build your profile.</p>
          ) : (
            entries.map(([catName, dims]) => (
              <div key={catName} className="profile-section">
                <h3 className="profile-cat">{catName}</h3>
                {Object.entries(dims).map(([dim, vals]) => (
                  <div key={dim} className="profile-row">
                    <span className="profile-dim">{dim}</span>
                    <div className="profile-vals">
                      {vals.map((v) => (
                        <span key={v} className="profile-tag">{v}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClear}>Clear all</button>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy JSON'}
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              Download .json
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
