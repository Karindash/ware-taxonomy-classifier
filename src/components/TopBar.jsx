import React from 'react';

export function TopBar({ selectedCount, onOpenProfile }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-hint">
          {selectedCount === 0
            ? 'Click trait tags to build your system profile'
            : `${selectedCount} trait${selectedCount !== 1 ? 's' : ''} selected across your profile`}
        </span>
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
