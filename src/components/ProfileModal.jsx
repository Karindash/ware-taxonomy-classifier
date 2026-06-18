import React, { useState } from 'react';

export function ProfileModal({ profile, prdContent, onClose, onClear }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('system'); // 'system' or 'prd'

  const jsonStr = JSON.stringify({ prd: prdContent, system: profile }, null, 2);
  const entries = Object.entries(profile);

  const handleCopy = () => {
    const textToCopy = activeTab === 'system' ? jsonStr : prdContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const content = activeTab === 'system' ? jsonStr : prdContent;
    const blob = new Blob([content], { type: activeTab === 'system' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab === 'system' ? 'design-profile.json' : 'prd.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Project profile</h2>
            <p className="modal-sub">Summary of your product and system design</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-tabs" style={{ margin: '0 24px', background: '#F6F4F0' }}>
          <button
            className={`mode-tab ${activeTab === 'prd' ? 'active' : ''}`}
            onClick={() => setActiveTab('prd')}
            style={{ color: activeTab === 'prd' ? '#1A1917' : '#6B6963' }}
          >
            Product PRD
          </button>
          <button
            className={`mode-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
            style={{ color: activeTab === 'system' ? '#1A1917' : '#6B6963' }}
          >
            System Design
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'system' ? (
            entries.length === 0 ? (
              <p className="modal-empty">No system attributes selected yet.</p>
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
            )
          ) : (
            <div className="prd-preview-modal">
              <pre className="prd-markdown" style={{ fontSize: '12px' }}>{prdContent}</pre>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClear}>Clear all</button>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={handleCopy}>
              {copied ? '✓ Copied' : `Copy ${activeTab === 'system' ? 'JSON' : 'Markdown'}`}
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              Download {activeTab === 'system' ? '.json' : '.md'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
