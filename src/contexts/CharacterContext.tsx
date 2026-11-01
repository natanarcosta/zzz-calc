import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { localStorage, STORAGE_KEYS } from '../lib/localStorage';
import { CharacterContext } from './characterContextDef';

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(() => {
    const saved = localStorage.get<string[]>(STORAGE_KEYS.SELECTED_CHARACTERS);
    return saved || [];
  });

  const [charactersWithWEngine, setCharactersWithWEngine] = useState<string[]>(() => {
    const saved = localStorage.get<string[]>('zzz-calc-w-engines');
    return saved || [];
  });

  useEffect(() => {
    localStorage.set(STORAGE_KEYS.SELECTED_CHARACTERS, selectedCharacters);
  }, [selectedCharacters]);

  useEffect(() => {
    localStorage.set('zzz-calc-w-engines', charactersWithWEngine);
  }, [charactersWithWEngine]);

  const toggleCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => {
      const newSelection = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId];
      if (!newSelection.includes(characterId)) {
        setCharactersWithWEngine((wPrev) => wPrev.filter((id) => id !== characterId));
      }
      return newSelection;
    });
  };

  const toggleWEngine = (characterId: string) => {
    setCharactersWithWEngine((prev) => {
      if (prev.includes(characterId)) {
        return prev.filter((id) => id !== characterId);
      }
      return [...prev, characterId];
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

  const hasWEngine = (characterId: string) => {
    return charactersWithWEngine.includes(characterId);
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacters,
        charactersWithWEngine,
        toggleCharacter,
        toggleWEngine,
        selectCharacter,
        deselectCharacter,
        clearSelection,
        isCharacterSelected,
        hasWEngine,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
