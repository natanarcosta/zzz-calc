import { useCharacters } from '../../contexts/CharacterContext';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';
import { MaterialIcon } from '../MaterialIcon';
import { MATERIAL_ICONS, getCharacterPortrait } from '../../lib/materialIcons';

export const CharacterSelector = () => {
  const { selectedCharacters, toggleCharacter, toggleWEngine, isCharacterSelected, hasWEngine } = useCharacters();
  const data = gameData as GameData;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Characters</h2>
        <span className="text-sm text-gray-400">{selectedCharacters.length} selected</span>
      </div>
      <div className="space-y-2">
        {data.characters.map((character) => (
          <div
            key={character.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              isCharacterSelected(character.id)
                ? 'bg-blue-900/30 border-blue-500'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
            }`}
            onClick={() => toggleCharacter(character.id)}
          >
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0">
                <MaterialIcon src={getCharacterPortrait(character.id)} alt={character.name} size="md" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{character.name}</h3>
                    <div className="flex gap-2 text-sm text-gray-400 items-center">
                      <span className="flex items-center gap-1">
                        {MATERIAL_ICONS.classes[character.class] && (
                          <MaterialIcon src={MATERIAL_ICONS.classes[character.class]} alt={character.class} size="sm" />
                        )}
                        {character.class}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {MATERIAL_ICONS.elements[character.element] && (
                          <MaterialIcon src={MATERIAL_ICONS.elements[character.element]} alt={character.element} size="sm" />
                        )}
                        {character.element}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-5 h-5 rounded border flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCharacterSelected(character.id)) {
                        toggleWEngine(character.id);
                      }
                    }}
                  >
                    {hasWEngine(character.id) && (
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                {isCharacterSelected(character.id) && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasWEngine(character.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleWEngine(character.id);
                        }}
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                      <span>Has W-Engine</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
