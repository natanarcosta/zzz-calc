import { useCharacters } from '../../contexts/CharacterContext';
import { useResources } from '../../contexts/ResourceContext';
import { calculateTotalProgress } from '../../lib/resourceCalculator';
import { CharacterProgressCard } from './CharacterProgressCard';
import { MissingResourcesCard } from './MissingResourcesCard';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';

export const ProgressDashboard = () => {
  const { selectedCharacters, charactersWithWEngine } = useCharacters();
  const { resources } = useResources();
  const data = gameData as GameData;

  const selectedCharacterData = data.characters
    .filter((char) => selectedCharacters.includes(char.id))
    .map((char) => ({
      ...char,
      hasWEngine: charactersWithWEngine.includes(char.id),
    }));

  if (selectedCharacterData.length === 0) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
        <p className="text-gray-400">No characters selected. Please select characters to view progress.</p>
      </div>
    );
  }

  // Calculate combined missing resources for all selected characters
  // Dennies, Expert Challenge, and Boss Materials are shared - take from first character
  // Seals and Chips need to be grouped by class/element
  const firstProgress = calculateTotalProgress(
    selectedCharacterData[0],
    resources,
    data.characterRequirements,
    selectedCharacterData
  );

  // Group seals by class and chips by element
  const sealsByClass: Record<string, { basic: number; advanced: number; topTier: number }> = {};
  const chipsByElement: Record<string, { basic: number; advanced: number; specialized: number }> = {};

  selectedCharacterData.forEach((character) => {
    const progress = calculateTotalProgress(
      character,
      resources,
      data.characterRequirements,
      selectedCharacterData
    );

    // Group seals by class
    if (!sealsByClass[character.class]) {
      sealsByClass[character.class] = { basic: 0, advanced: 0, topTier: 0 };
    }
    sealsByClass[character.class].basic += progress.missing.seals.basic;
    sealsByClass[character.class].advanced += progress.missing.seals.advanced;
    sealsByClass[character.class].topTier += progress.missing.seals.topTier;

    // Group chips by element
    if (!chipsByElement[character.element]) {
      chipsByElement[character.element] = { basic: 0, advanced: 0, specialized: 0 };
    }
    chipsByElement[character.element].basic += progress.missing.chips.basic;
    chipsByElement[character.element].advanced += progress.missing.chips.advanced;
    chipsByElement[character.element].specialized += progress.missing.chips.specialized;
  });

  // Sum up all grouped seals and chips
  const combinedSeals = Object.values(sealsByClass).reduce(
    (acc, seals) => ({
      basic: acc.basic + seals.basic,
      advanced: acc.advanced + seals.advanced,
      topTier: acc.topTier + seals.topTier,
    }),
    { basic: 0, advanced: 0, topTier: 0 }
  );

  const combinedChips = Object.values(chipsByElement).reduce(
    (acc, chips) => ({
      basic: acc.basic + chips.basic,
      advanced: acc.advanced + chips.advanced,
      specialized: acc.specialized + chips.specialized,
    }),
    { basic: 0, advanced: 0, specialized: 0 }
  );

  const combinedMissing = {
    exp: firstProgress.missing.exp,
    dennies: firstProgress.missing.dennies,
    expertChallenge: firstProgress.missing.expertChallenge,
    bossMaterials: firstProgress.missing.bossMaterials,
    hamsterCagePass: firstProgress.missing.hamsterCagePass,
    seals: combinedSeals,
    chips: combinedChips,
    wEngineExp: firstProgress.missing.wEngineExp,
    wEngineAscension: firstProgress.missing.wEngineAscension,
    sealsByClass,
    chipsByElement,
  };

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
