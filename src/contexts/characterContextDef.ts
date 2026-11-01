import { createContext } from 'react';

export interface CharacterContextType {
  selectedCharacters: string[];
  charactersWithWEngine: string[];
  toggleCharacter: (characterId: string) => void;
  toggleWEngine: (characterId: string) => void;
  selectCharacter: (characterId: string) => void;
  deselectCharacter: (characterId: string) => void;
  clearSelection: () => void;
  isCharacterSelected: (characterId: string) => boolean;
  hasWEngine: (characterId: string) => boolean;
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);
