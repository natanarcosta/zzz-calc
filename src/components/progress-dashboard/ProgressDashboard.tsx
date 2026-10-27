import { useCharacters } from '../../contexts/CharacterContext';
import { useResources } from '../../contexts/ResourceContext';
import { calculateTotalProgress } from '../../lib/resourceCalculator';
import { CharacterProgressCard } from './CharacterProgressCard';
import { MissingResourcesCard } from './MissingResourcesCard';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';

export const ProgressDashboard = () => {
  const { selectedCharacters } = useCharacters();
  const { resources } = useResources();
  const data = gameData as GameData;

  const selectedCharacterData = data.characters.filter((char) =>
    selectedCharacters.includes(char.id)
  );

  if (selectedCharacterData.length === 0) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
        <p className="text-gray-400">No characters selected. Please select characters to view progress.</p>
      </div>
    );
  }

  // Calculate combined missing resources for all selected characters
  const combinedMissing = selectedCharacterData.reduce((acc, character) => {
    const progress = calculateTotalProgress(
      character,
      resources,
      data.characterRequirements,
      selectedCharacterData
    );
    return {
      exp: acc.exp + progress.missing.exp,
      dennies: acc.dennies + progress.missing.dennies,
      expertChallenge: acc.expertChallenge + progress.missing.expertChallenge,
      bossMaterials: acc.bossMaterials + progress.missing.bossMaterials,
      seals: {
        basic: acc.seals.basic + progress.missing.seals.basic,
        advanced: acc.seals.advanced + progress.missing.seals.advanced,
        topTier: acc.seals.topTier + progress.missing.seals.topTier,
      },
      chips: {
        basic: acc.chips.basic + progress.missing.chips.basic,
        advanced: acc.chips.advanced + progress.missing.chips.advanced,
        specialized: acc.chips.specialized + progress.missing.chips.specialized,
      },
    };
  }, {
    exp: 0,
    dennies: 0,
    expertChallenge: 0,
    bossMaterials: 0,
    seals: { basic: 0, advanced: 0, topTier: 0 },
    chips: { basic: 0, advanced: 0, specialized: 0 },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Progress Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedCharacterData.map((character) => {
          const progress = calculateTotalProgress(
            character,
            resources,
            data.characterRequirements,
            selectedCharacterData
          );
          return (
            <CharacterProgressCard
              key={character.id}
              character={character}
              progress={progress}
            />
          );
        })}
      </div>
      <MissingResourcesCard missingResources={combinedMissing} />
    </div>
  );
};
