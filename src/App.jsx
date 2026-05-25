import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';
import { TopBar } from './components/TopBar';
import { ProfileModal } from './components/ProfileModal';
import { useTaxonomy } from './hooks/useTaxonomy';
import './App.css';

export default function App() {
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

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar
        categories={filteredCats}
        activeCatId={activeCatId}
        onSelect={setActiveCatId}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <div className="main">
        <TopBar selectedCount={selectedCount} onOpenProfile={() => setModalOpen(true)} />
        <div className="main-scroll">
          <DetailPanel
            cat={activeCat}
            isTagSelected={isTagSelected}
            onToggle={toggleTag}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      {modalOpen && (
        <ProfileModal
          profile={exportProfile()}
          onClose={() => setModalOpen(false)}
          onClear={() => { clearSelections(); setModalOpen(false); }}
        />
      )}
    </div>
  );
}
