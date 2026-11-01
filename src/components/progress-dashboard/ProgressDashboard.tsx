import { useCharacters } from '../../hooks/useCharacters';
import { useResources } from '../../hooks/useResources';
import { calculateTotalProgress } from '../../lib/resourceCalculator';
import { CharacterProgressCard } from './CharacterProgressCard';
import { MissingResourcesCard } from './MissingResourcesCard';
import { DashboardOverview } from './DashboardOverview';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';
import { Users, Crosshair } from 'lucide-react';

export const ProgressDashboard = () => {
  const { selectedCharacters, charactersWithWEngine, toggleCharacter, toggleWEngine } =
    useCharacters();
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
      <div className="bg-zzz-surface rounded-sm border border-zzz-border p-8 sm:p-12 text-center relative overflow-hidden zzz-stripes-hazard/20">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-zzz-accent mx-auto flex items-center justify-center mb-4">
          <Crosshair className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-zzz-accent font-bold mb-1">
          // SYSTEM.STANDBY
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
          No Agents Selected
        </h3>
        <p className="text-sm text-zzz-text-secondary max-w-md mx-auto mt-2">
          Select one or more agents from the directory to analyze promotion readiness, calculate required certification seals, and audit material shortages.
        </p>
      </div>
    );
  }

  // Calculate combined missing resources for all selected characters
  const firstProgress = calculateTotalProgress(
    selectedCharacterData[0],
    resources,
    data.characterRequirements,
    selectedCharacterData
  );

  // Group seals by class and chips by element
  const sealsByClass: Record<string, { basic: number; advanced: number; topTier: number }> = {};
  const chipsByElement: Record<string, { basic: number; advanced: number; specialized: number }> = {};

  const progressList = selectedCharacterData.map((character) => {
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

    return {
      character,
      progress,
    };
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

  // Derive counts for overview
  let missingItemCount = 0;
  if (combinedMissing.exp > 0) missingItemCount++;
  if (combinedMissing.dennies > 0) missingItemCount++;
  if (combinedMissing.expertChallenge > 0) missingItemCount++;
  if (combinedMissing.bossMaterials > 0) missingItemCount++;
  if (combinedMissing.hamsterCagePass > 0) missingItemCount++;
  if (combinedMissing.wEngineExp > 0) missingItemCount++;

  Object.values(sealsByClass).forEach((s) => {
    if (s.basic > 0) missingItemCount++;
    if (s.advanced > 0) missingItemCount++;
    if (s.topTier > 0) missingItemCount++;
  });

  Object.values(chipsByElement).forEach((c) => {
    if (c.basic > 0) missingItemCount++;
    if (c.advanced > 0) missingItemCount++;
    if (c.specialized > 0) missingItemCount++;
  });

  if (combinedMissing.wEngineAscension.basic > 0) missingItemCount++;
  if (combinedMissing.wEngineAscension.advanced > 0) missingItemCount++;
  if (combinedMissing.wEngineAscension.expert > 0) missingItemCount++;

  const averageProgress =
    progressList.reduce((acc, p) => acc + p.progress.total, 0) / (progressList.length || 1);

  return (
    <div className="space-y-4 lg:space-y-5">
      {/* Overview Metrics Bar */}
      <DashboardOverview
        selectedCount={selectedCharacterData.length}
        averageProgress={averageProgress}
        missingItemCount={missingItemCount}
      />

      {/* Target Dossiers Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-zzz-accent" />
            <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">
              Selected Agent Targets
            </h2>
          </div>
          <span className="font-mono text-xs text-zzz-text-muted">
            {selectedCharacterData.length} ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {progressList.map(({ character, progress }) => (
            <CharacterProgressCard
              key={character.id}
              character={character}
              progress={progress}
              onRemove={() => toggleCharacter(character.id)}
              onToggleWEngine={() => toggleWEngine(character.id)}
            />
          ))}
        </div>
      </div>

      {/* Missing Materials Analysis */}
      <MissingResourcesCard missingResources={combinedMissing} />
    </div>
  );
};
