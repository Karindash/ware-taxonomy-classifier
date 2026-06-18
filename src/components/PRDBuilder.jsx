import React from 'react';

export function PRDBuilder({
  current,
  step,
  totalSteps,
  answers,
  setField,
  toggleChip,
  getField,
  goNext,
  goBack,
  progress,
  showPRD,
  buildPRD,
  goTo
}) {
  if (showPRD) {
    return (
      <div className="detail-panel prd-preview">
        <div className="detail-header">
          <div className="detail-accent" style={{ background: '#1A1917' }} />
          <div>
            <h2 className="detail-title">Product Requirements Document</h2>
            <p className="detail-desc">Review your generated PRD based on the answers provided.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => window.print()}>Print / Export</button>
        </div>

        <div className="prd-content-wrap">
          <pre className="prd-markdown">{buildPRD()}</pre>
        </div>

        <div className="prd-footer">
          <button className="btn btn-ghost" onClick={goBack}>← Back to editing</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-panel prd-builder">
      <div className="detail-header">
        <div className="detail-accent" style={{ background: '#1A1917' }} />
        <div>
          <div className="step-indicator">Step {step + 1} of {totalSteps} — {current.label}</div>
          <h2 className="detail-title">{current.title}</h2>
          <p className="detail-desc">{current.sub}</p>
        </div>
        <div className="progress-mini">
          <div className="progress-mini-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="prd-fields">
        {current.fields.map(field => (
          <div key={field.id} className="prd-field-group">
            <label className="prd-label">
              {field.label}
              {field.req && <span className="req">*</span>}
            </label>
            {field.hint && <p className="prd-hint">{field.hint}</p>}

            {field.type === 'text' && (
              <input
                className="prd-input"
                type="text"
                placeholder={field.placeholder}
                value={getField(current.id, field.id)}
                onChange={(e) => setField(current.id, field.id, e.target.value)}
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                className="prd-input prd-textarea"
                placeholder={field.placeholder}
                value={getField(current.id, field.id)}
                onChange={(e) => setField(current.id, field.id, e.target.value)}
                rows={4}
              />
            )}

            {field.type === 'chips' && (
              <div className="attr-tags">
                {field.opts.map(opt => {
                  const selected = (answers[current.id]?.[field.id] || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      className={`attr-tag ${selected ? 'selected' : ''}`}
                      onClick={() => toggleChip(current.id, field.id, opt)}
                    >
                      {selected && <span className="tag-check">✓</span>}
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="prd-footer">
        <button
          className="btn btn-ghost"
          onClick={goBack}
          disabled={step === 0}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={goNext}
        >
          {step === totalSteps - 1 ? 'Generate PRD' : 'Next step'}
        </button>
      </div>
    </div>
  );
}
