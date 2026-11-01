import { useContext } from 'react';
import { CharacterContext, type CharacterContextType } from '../contexts/characterContextDef';

export const useCharacters = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
