import { useCharacters } from '../../contexts/CharacterContext';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';

export const CharacterSelector = () => {
  const { selectedCharacters, toggleCharacter, isCharacterSelected } = useCharacters();
  const data = gameData as GameData;
  const characters = data.characters;

  return (
    <div className="space-y-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-4">Select Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              isCharacterSelected(character.id)
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
            onClick={() => toggleCharacter(character.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{character.name}</h3>
              <div className="w-5 h-5 rounded border-2 flex items-center justify-center">
                {isCharacterSelected(character.id) && (
                  <div className="w-3 h-3 bg-purple-500 rounded-sm" />
                )}
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Class:</span>
                <span className="text-gray-300">{character.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Element:</span>
                <span className="text-gray-300">{character.element}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Selected: {selectedCharacters.length} / {characters.length} characters
      </div>
    </div>
  );
};
