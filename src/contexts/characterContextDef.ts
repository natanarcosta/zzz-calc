import { createContext } from 'react';
import type { SkillLevels } from '../types';

export interface CharacterContextType {
  selectedCharacters: string[];
  charactersWithWEngine: string[];
  characterSkillLevels: Record<string, SkillLevels>;
  toggleCharacter: (characterId: string) => void;
  toggleWEngine: (characterId: string) => void;
  selectCharacter: (characterId: string) => void;
  deselectCharacter: (characterId: string) => void;
  clearSelection: () => void;
  isCharacterSelected: (characterId: string) => boolean;
  hasWEngine: (characterId: string) => boolean;
  updateSkillLevel: (characterId: string, skill: keyof SkillLevels, level: number) => void;
  getSkillLevels: (characterId: string) => SkillLevels;
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);
