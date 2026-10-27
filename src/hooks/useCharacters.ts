import { useState, useEffect } from 'react';
import { localStorage, STORAGE_KEYS } from '../lib/localStorage';

export const useCharacters = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(() => {
    const saved = localStorage.get<string[]>(STORAGE_KEYS.SELECTED_CHARACTERS);
    return saved || [];
  });

  useEffect(() => {
    localStorage.set(STORAGE_KEYS.SELECTED_CHARACTERS, selectedCharacters);
  }, [selectedCharacters]);

  const toggleCharacter = (characterId: string) => {
    console.log('toggleCharacter called with:', characterId, 'current:', selectedCharacters);
    setSelectedCharacters((prev) => {
      const newSelection = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId];
      console.log('New selection:', newSelection);
      return newSelection;
    });
  };

  const selectCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => {
      if (!prev.includes(characterId)) {
        return [...prev, characterId];
      }
      return prev;
    });
  };

  const deselectCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => prev.filter((id) => id !== characterId));
  };

  const clearSelection = () => {
    setSelectedCharacters([]);
  };

  const isCharacterSelected = (characterId: string) => {
    return selectedCharacters.includes(characterId);
  };

  return {
    selectedCharacters,
    toggleCharacter,
    selectCharacter,
    deselectCharacter,
    clearSelection,
    isCharacterSelected,
  };
};
