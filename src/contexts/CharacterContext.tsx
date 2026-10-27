import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { localStorage, STORAGE_KEYS } from '../lib/localStorage';

interface CharacterContextType {
  selectedCharacters: string[];
  toggleCharacter: (characterId: string) => void;
  selectCharacter: (characterId: string) => void;
  deselectCharacter: (characterId: string) => void;
  clearSelection: () => void;
  isCharacterSelected: (characterId: string) => boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(() => {
    const saved = localStorage.get<string[]>(STORAGE_KEYS.SELECTED_CHARACTERS);
    return saved || [];
  });

  useEffect(() => {
    localStorage.set(STORAGE_KEYS.SELECTED_CHARACTERS, selectedCharacters);
  }, [selectedCharacters]);

  const toggleCharacter = (characterId: string) => {
    console.log('Context toggleCharacter:', characterId, 'current:', selectedCharacters);
    setSelectedCharacters((prev) => {
      const newSelection = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId];
      console.log('Context new selection:', newSelection);
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

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacters,
        toggleCharacter,
        selectCharacter,
        deselectCharacter,
        clearSelection,
        isCharacterSelected,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
