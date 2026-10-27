import { useResources } from '../../contexts/ResourceContext';
import { Coins, Scroll } from 'lucide-react';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';

export const ResourceInput = () => {
  const {
    resources,
    updateDennies,
    updateInvestigatorLogs,
    updateSeals,
    updateChips,
    updateExpertChallengeMaterials,
    updateBossMaterials,
  } = useResources();

  const data = gameData as GameData;

  return (
    <div className="space-y-6 p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-4">Resource Input</h2>

      {/* Dennies */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Coins className="w-4 h-4" />
          Dennies
        </label>
        <input
          type="number"
          min="0"
          value={resources.dennies}
          onChange={(e) => updateDennies(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter Dennies amount"
        />
      </div>

      {/* Investigator Logs */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Scroll className="w-4 h-4" />
          Investigator Logs
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Trainee (100 EXP)</label>
            <input
              type="number"
              min="0"
              value={resources.investigatorLogs.trainee}
              onChange={(e) => updateInvestigatorLogs({ trainee: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Official (600 EXP)</label>
            <input
              type="number"
              min="0"
              value={resources.investigatorLogs.official}
              onChange={(e) => updateInvestigatorLogs({ official: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Senior (3,000 EXP)</label>
            <input
              type="number"
              min="0"
              value={resources.investigatorLogs.senior}
              onChange={(e) => updateInvestigatorLogs({ senior: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Certification Seals */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Certification Seals</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.classes.map((className: string) => (
            <div key={className} className="space-y-2 p-3 bg-gray-800 rounded-md border border-gray-700">
              <h3 className="text-sm font-semibold text-white">{className}</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Basic</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.seals[className]?.basic || 0}
                    onChange={(e) => updateSeals(className, { basic: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Advanced</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.seals[className]?.advanced || 0}
                    onChange={(e) => updateSeals(className, { advanced: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Top-Tier</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.seals[className]?.topTier || 0}
                    onChange={(e) => updateSeals(className, { topTier: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Element Chips */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Element Chips</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.elements.map((element: string) => (
            <div key={element} className="space-y-2 p-3 bg-gray-800 rounded-md border border-gray-700">
              <h3 className="text-sm font-semibold text-white">{element}</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Basic</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.chips[element]?.basic || 0}
                    onChange={(e) => updateChips(element, { basic: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Advanced</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.chips[element]?.advanced || 0}
                    onChange={(e) => updateChips(element, { advanced: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Specialized</label>
                  <input
                    type="number"
                    min="0"
                    value={resources.chips[element]?.specialized || 0}
                    onChange={(e) => updateChips(element, { specialized: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Challenge Materials */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Expert Challenge Materials</label>
        <input
          type="number"
          min="0"
          value={resources.expertChallengeMaterials}
          onChange={(e) => updateExpertChallengeMaterials(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter amount (max 60 per character)"
        />
      </div>

      {/* Boss Materials */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Boss Materials</label>
        <input
          type="number"
          min="0"
          value={resources.bossMaterials}
          onChange={(e) => updateBossMaterials(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter amount (max 9 per character)"
        />
      </div>
    </div>
  );
};
