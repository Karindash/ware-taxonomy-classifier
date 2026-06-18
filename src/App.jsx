import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';
import { TopBar } from './components/TopBar';
import { ProfileModal } from './components/ProfileModal';
import { PRDBuilder } from './components/PRDBuilder';
import { useTaxonomy } from './hooks/useTaxonomy';
import { usePRD } from './business-req/usePRD';
import { STEPS } from './business-req/steps';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('prd'); // Start with PRD mode

  const {
    activeCat,
    activeCatId,
    setActiveCatId,
    searchQuery,
    setSearchQuery,
    filteredCats,
    toggleTag,
    isTagSelected,
    clearSelections,
    selectedCount,
    exportProfile,
  } = useTaxonomy();

  const {
    step, current, answers, showPRD,
    setField, toggleChip, getField,
    isStepComplete, progress, completedCount,
    goNext, goBack, goTo, buildPRD
  } = usePRD();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar
        mode={mode}
        setMode={setMode}
        categories={filteredCats}
        activeCatId={activeCatId}
        onSelect={setActiveCatId}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        prdSteps={STEPS}
        currentPrdStep={step}
        onPrdStepSelect={goTo}
        isPrdStepComplete={isStepComplete}
      />
      <div className="main">
        <TopBar
          mode={mode}
          selectedCount={selectedCount}
          onOpenProfile={() => setModalOpen(true)}
          prdProgress={progress}
        />
        <div className="main-scroll">
          {mode === 'taxonomy' ? (
            <DetailPanel
              cat={activeCat}
              isTagSelected={isTagSelected}
              onToggle={toggleTag}
              searchQuery={searchQuery}
            />
          ) : (
            <PRDBuilder
              current={current}
              step={step}
              totalSteps={STEPS.length}
              answers={answers}
              setField={setField}
              toggleChip={toggleChip}
              getField={getField}
              goNext={goNext}
              goBack={goBack}
              progress={progress}
              showPRD={showPRD}
              buildPRD={buildPRD}
              goTo={goTo}
            />
          )}
        </div>
      </div>
      {modalOpen && (
        <ProfileModal
          profile={exportProfile()}
          prdContent={buildPRD()}
          onClose={() => setModalOpen(false)}
          onClear={() => { clearSelections(); setModalOpen(false); }}
        />
      )}
    </div>
  );
}
