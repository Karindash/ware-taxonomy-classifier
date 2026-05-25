import { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/taxonomy';

export function useTaxonomy() {
  const [activeCatId, setActiveCatId] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState({});

  const activeCat = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCatId),
    [activeCatId]
  );

  const filteredCats = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.toLowerCase();
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.desc.toLowerCase().includes(q) ||
        cat.dims.some(
          (d) =>
            d.dim.toLowerCase().includes(q) ||
            d.vals.some((v) => v.toLowerCase().includes(q))
        )
    );
  }, [searchQuery]);

  const toggleTag = (catId, dim, val) => {
    const key = `${catId}::${dim}::${val}`;
    setSelectedTags((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = { catId, dim, val };
      return next;
    });
  };

  const isTagSelected = (catId, dim, val) =>
    Boolean(selectedTags[`${catId}::${dim}::${val}`]);

  const clearSelections = () => setSelectedTags({});

  const selectedCount = Object.keys(selectedTags).length;

  const exportProfile = () => {
    const grouped = {};
    Object.values(selectedTags).forEach(({ catId, dim, val }) => {
      const cat = CATEGORIES.find((c) => c.id === catId);
      if (!grouped[cat.name]) grouped[cat.name] = {};
      if (!grouped[cat.name][dim]) grouped[cat.name][dim] = [];
      grouped[cat.name][dim].push(val);
    });
    return grouped;
  };

  return {
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
    selectedTags,
  };
}
