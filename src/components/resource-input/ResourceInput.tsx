import { useResources } from '../../contexts/ResourceContext';
import { Coins, Scroll } from 'lucide-react';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';

interface ResourceInputProps {
  compact?: boolean;
}

const inputClass =
  'w-full px-2 py-1.5 lg:py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/70';
const inputClassCompact =
  'w-full px-2 py-1 bg-gray-800/80 border border-gray-700/80 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50';

export const ResourceInput = ({ compact = false }: ResourceInputProps) => {
  const {
    resources,
    updateDennies,
    updateInvestigatorLogs,
    updateSeals,
    updateChips,
    updateExpertChallengeMaterials,
    updateBossMaterials,
    updateHamsterCagePass,
    updateWEngineExpMaterials,
    updateWEngineAscensionMaterials,
  } = useResources();

  const data = gameData as GameData;

  const fieldInput = compact ? inputClassCompact : inputClass;
  const tierInput = compact
    ? 'w-full px-1.5 py-0.5 bg-gray-700/80 border border-gray-600/80 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50'
    : 'w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500';

  const shellClass = compact
    ? 'p-3 lg:p-4 bg-gray-950/80 rounded-lg border border-gray-800/80'
    : 'space-y-6 p-6 bg-gray-900 rounded-lg border border-gray-800';

  return (
    <div className={shellClass}>
      <h2
        className={
          compact
            ? 'text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2 shrink-0'
            : 'text-2xl font-bold text-white mb-4'
        }
      >
        {compact ? 'Your resources' : 'Resource Input'}
      </h2>

      <div className={compact ? 'space-y-3' : 'space-y-6'}>
        <div
          className={
            compact
              ? 'grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 lg:gap-3'
              : 'space-y-6'
          }
        >
          {/* Dennies */}
          <div className={compact ? 'space-y-1' : 'space-y-2'}>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <Coins className="w-3.5 h-3.5" />
              Dennies
            </label>
            <input
              type="number"
              min="0"
              value={resources.dennies}
              onChange={(e) => updateDennies(Number(e.target.value))}
              className={fieldInput}
              placeholder="0"
            />
          </div>

          {/* Expert Challenge Materials */}
          <div className={compact ? 'space-y-1' : 'space-y-2'}>
            <label className="text-xs font-medium text-gray-400">Expert Materials</label>
            <input
              type="number"
              min="0"
              value={resources.expertChallengeMaterials}
              onChange={(e) => updateExpertChallengeMaterials(Number(e.target.value))}
              className={fieldInput}
              placeholder="0"
            />
          </div>

          {/* Boss Materials */}
          <div className={compact ? 'space-y-1' : 'space-y-2'}>
            <label className="text-xs font-medium text-gray-400">Boss Materials</label>
            <input
              type="number"
              min="0"
              value={resources.bossMaterials}
              onChange={(e) => updateBossMaterials(Number(e.target.value))}
              className={fieldInput}
              placeholder="0"
            />
          </div>

          {/* Investigator Logs */}
          <div className={compact ? 'col-span-2 lg:col-span-4 xl:col-span-3 space-y-1' : 'space-y-3'}>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <Scroll className="w-3.5 h-3.5" />
              Investigator Logs
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] lg:text-xs text-gray-500 mb-0.5 block">Trainee</label>
                <input
                  type="number"
                  min="0"
                  value={resources.investigatorLogs.trainee}
                  onChange={(e) => updateInvestigatorLogs({ trainee: Number(e.target.value) })}
                  className={fieldInput}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-[10px] lg:text-xs text-gray-500 mb-0.5 block">Official</label>
                <input
                  type="number"
                  min="0"
                  value={resources.investigatorLogs.official}
                  onChange={(e) => updateInvestigatorLogs({ official: Number(e.target.value) })}
                  className={fieldInput}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-[10px] lg:text-xs text-gray-500 mb-0.5 block">Senior</label>
                <input
                  type="number"
                  min="0"
                  value={resources.investigatorLogs.senior}
                  onChange={(e) => updateInvestigatorLogs({ senior: Number(e.target.value) })}
                  className={fieldInput}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certification Seals */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">Certification Seals</label>
          <div
            className={
              compact
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
            }
          >
            {data.classes.map((className: string) => (
              <div
                key={className}
                className={
                  compact
                    ? 'p-2 bg-gray-900/60 rounded border border-gray-800/80'
                    : 'space-y-2 p-3 bg-gray-800 rounded-md border border-gray-700'
                }
              >
                <h3 className="text-xs font-semibold text-gray-300 truncate mb-1.5">{className}</h3>
                <div className={compact ? 'grid grid-cols-3 gap-1' : 'space-y-2'}>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Bas</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.seals[className]?.basic || 0}
                      onChange={(e) => updateSeals(className, { basic: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Adv</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.seals[className]?.advanced || 0}
                      onChange={(e) => updateSeals(className, { advanced: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Top</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.seals[className]?.topTier || 0}
                      onChange={(e) => updateSeals(className, { topTier: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Element Chips */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">Element Chips</label>
          <div
            className={
              compact
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
            }
          >
            {data.elements.map((element: string) => (
              <div
                key={element}
                className={
                  compact
                    ? 'p-2 bg-gray-900/60 rounded border border-gray-800/80'
                    : 'space-y-2 p-3 bg-gray-800 rounded-md border border-gray-700'
                }
              >
                <h3 className="text-xs font-semibold text-gray-300 truncate mb-1.5">{element}</h3>
                <div className={compact ? 'grid grid-cols-3 gap-1' : 'space-y-2'}>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Bas</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.chips[element]?.basic || 0}
                      onChange={(e) => updateChips(element, { basic: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Adv</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.chips[element]?.advanced || 0}
                      onChange={(e) => updateChips(element, { advanced: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Spec</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.chips[element]?.specialized || 0}
                      onChange={(e) => updateChips(element, { specialized: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hamster Cage Pass */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">Hamster Cage Pass</label>
          <input
            type="number"
            min="0"
            value={resources.hamsterCagePass || 0}
            onChange={(e) => updateHamsterCagePass(Number(e.target.value))}
            className={fieldInput}
            placeholder="0"
          />
        </div>

        {/* W-Engine EXP Materials */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">W-Engine EXP Materials</label>
          <div className={compact ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-3 gap-3'}>
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">Basic</label>
              <input
                type="number"
                min="0"
                value={resources.wEngineExpMaterials?.basic || 0}
                onChange={(e) => updateWEngineExpMaterials({ basic: Number(e.target.value) })}
                className={tierInput}
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">Advanced</label>
              <input
                type="number"
                min="0"
                value={resources.wEngineExpMaterials?.advanced || 0}
                onChange={(e) => updateWEngineExpMaterials({ advanced: Number(e.target.value) })}
                className={tierInput}
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 mb-0.5 block">Expert</label>
              <input
                type="number"
                min="0"
                value={resources.wEngineExpMaterials?.expert || 0}
                onChange={(e) => updateWEngineExpMaterials({ expert: Number(e.target.value) })}
                className={tierInput}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* W-Engine Ascension Materials */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400">W-Engine Ascension Materials (by Class)</label>
          <div
            className={
              compact
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
            }
          >
            {data.classes.map((className: string) => (
              <div
                key={className}
                className={
                  compact
                    ? 'p-2 bg-gray-900/60 rounded border border-gray-800/80'
                    : 'space-y-2 p-3 bg-gray-800 rounded-md border border-gray-700'
                }
              >
                <h3 className="text-xs font-semibold text-gray-300 truncate mb-1.5">{className}</h3>
                <div className={compact ? 'grid grid-cols-3 gap-1' : 'space-y-2'}>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Bas</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.wEngineAscensionMaterials?.[className]?.basic || 0}
                      onChange={(e) => updateWEngineAscensionMaterials(className, { basic: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Adv</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.wEngineAscensionMaterials?.[className]?.advanced || 0}
                      onChange={(e) => updateWEngineAscensionMaterials(className, { advanced: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 mb-0.5 block">Exp</label>
                    <input
                      type="number"
                      min="0"
                      value={resources.wEngineAscensionMaterials?.[className]?.expert || 0}
                      onChange={(e) => updateWEngineAscensionMaterials(className, { expert: Number(e.target.value) })}
                      className={tierInput}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
