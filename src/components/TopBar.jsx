import React from 'react';

export function TopBar({ mode, selectedCount, onOpenProfile, prdProgress }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {mode === 'taxonomy' ? (
          <span className="topbar-hint">
            {selectedCount === 0
              ? 'Click trait tags to build your system profile'
              : `${selectedCount} trait${selectedCount !== 1 ? 's' : ''} selected across your profile`}
          </span>
        ) : (
          <div className="topbar-prd-progress">
            <span className="topbar-hint">PRD Progress: {prdProgress}%</span>
            <div className="progress-bar-small">
              <div className="progress-bar-small-fill" style={{ width: `${prdProgress}%` }} />
            </div>
          </div>
        )}
      </div>
      <button
        className={`profile-btn ${selectedCount > 0 ? 'has-items' : ''}`}
        onClick={onOpenProfile}
      >
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
          <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor"/>
          <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor"/>
          <rect x="3" y="14" width="12" height="2" rx="1" fill="currentColor"/>
        </svg>
        View profile
        {selectedCount > 0 && (
          <span className="profile-count">{selectedCount}</span>
        )}
      </button>
    </div>
  );
}
