import type { MissingResources } from '../../types';

interface MissingResourcesCardProps {
  missingResources: MissingResources & {
    sealsByClass?: Record<string, { basic: number; advanced: number; topTier: number }>;
    chipsByElement?: Record<string, { basic: number; advanced: number; specialized: number }>;
  };
}

export const MissingResourcesCard = ({ missingResources }: MissingResourcesCardProps) => {
  const hasMissing = 
    missingResources.exp > 0 ||
    missingResources.dennies > 0 ||
    missingResources.expertChallenge > 0 ||
    missingResources.bossMaterials > 0 ||
    missingResources.hamsterCagePass > 0 ||
    missingResources.wEngineExp > 0 ||
    missingResources.seals.basic > 0 ||
    missingResources.seals.advanced > 0 ||
    missingResources.seals.topTier > 0 ||
    missingResources.chips.basic > 0 ||
    missingResources.chips.advanced > 0 ||
    missingResources.chips.specialized > 0 ||
    missingResources.wEngineAscension.basic > 0 ||
    missingResources.wEngineAscension.advanced > 0 ||
    missingResources.wEngineAscension.expert > 0;

  if (!hasMissing) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
        <p className="text-green-400 font-medium">All resources collected! 🎉</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Missing Resources</h3>
      <div className="space-y-3">
        {missingResources.exp > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">EXP (in Senior Logs):</span>
            <span className="text-red-400 font-medium">{Math.ceil(missingResources.exp / 3000)} Senior Logs</span>
          </div>
        )}
        {missingResources.dennies > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Dennies:</span>
            <span className="text-red-400 font-medium">{missingResources.dennies.toLocaleString()}</span>
          </div>
        )}
        {missingResources.expertChallenge > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Expert Challenge Materials:</span>
            <span className="text-red-400 font-medium">{missingResources.expertChallenge}</span>
          </div>
        )}
        {missingResources.bossMaterials > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Boss Materials:</span>
            <span className="text-red-400 font-medium">{missingResources.bossMaterials}</span>
          </div>
        )}
        {missingResources.hamsterCagePass > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Hamster Cage Pass:</span>
            <span className="text-red-400 font-medium">{missingResources.hamsterCagePass}</span>
          </div>
        )}
        {missingResources.wEngineExp > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">W-Engine EXP (in Expert Materials):</span>
            <span className="text-red-400 font-medium">{Math.ceil(missingResources.wEngineExp / 3000)} Expert Materials</span>
          </div>
        )}
        {(missingResources.seals.basic > 0 || missingResources.seals.advanced > 0 || missingResources.seals.topTier > 0) && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p className="text-gray-400 text-sm mb-2">Seals:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <span className="text-gray-500 font-medium">Class</span>
                <span className="text-gray-500 font-medium">Basic</span>
                <span className="text-gray-500 font-medium">Advanced</span>
                <span className="text-gray-500 font-medium">Top-Tier</span>
              </div>
              {missingResources.sealsByClass && Object.keys(missingResources.sealsByClass).length > 0 ? (
                Object.entries(missingResources.sealsByClass).map(([className, seals]) => (
                  (seals.basic > 0 || seals.advanced > 0 || seals.topTier > 0) && (
                    <div key={className} className="grid grid-cols-4 gap-2 text-xs">
                      <span className="text-gray-400">{className}</span>
                      <span className="text-red-400">{seals.basic}</span>
                      <span className="text-red-400">{seals.advanced}</span>
                      <span className="text-red-400">{seals.topTier}</span>
                    </div>
                  )
                ))
              ) : (
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <span className="text-gray-400">All Classes</span>
                  <span className="text-red-400">{missingResources.seals.basic}</span>
                  <span className="text-red-400">{missingResources.seals.advanced}</span>
                  <span className="text-red-400">{missingResources.seals.topTier}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {(missingResources.chips.basic > 0 || missingResources.chips.advanced > 0 || missingResources.chips.specialized > 0) && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p className="text-gray-400 text-sm mb-2">Chips:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <span className="text-gray-500 font-medium">Element</span>
                <span className="text-gray-500 font-medium">Basic</span>
                <span className="text-gray-500 font-medium">Advanced</span>
                <span className="text-gray-500 font-medium">Specialized</span>
              </div>
              {missingResources.chipsByElement && Object.keys(missingResources.chipsByElement).length > 0 ? (
                Object.entries(missingResources.chipsByElement).map(([element, chips]) => (
                  (chips.basic > 0 || chips.advanced > 0 || chips.specialized > 0) && (
                    <div key={element} className="grid grid-cols-4 gap-2 text-xs">
                      <span className="text-gray-400">{element}</span>
                      <span className="text-red-400">{chips.basic}</span>
                      <span className="text-red-400">{chips.advanced}</span>
                      <span className="text-red-400">{chips.specialized}</span>
                    </div>
                  )
                ))
              ) : (
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <span className="text-gray-400">All Elements</span>
                  <span className="text-red-400">{missingResources.chips.basic}</span>
                  <span className="text-red-400">{missingResources.chips.advanced}</span>
                  <span className="text-red-400">{missingResources.chips.specialized}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {(missingResources.wEngineAscension.basic > 0 || missingResources.wEngineAscension.advanced > 0 || missingResources.wEngineAscension.expert > 0) && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p className="text-gray-400 text-sm mb-2">W-Engine Ascension Materials:</p>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {missingResources.wEngineAscension.basic > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Basic</span>
                  <span className="text-red-400 font-medium">{missingResources.wEngineAscension.basic}</span>
                </div>
              )}
              {missingResources.wEngineAscension.advanced > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Advanced</span>
                  <span className="text-red-400 font-medium">{missingResources.wEngineAscension.advanced}</span>
                </div>
              )}
              {missingResources.wEngineAscension.expert > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Expert</span>
                  <span className="text-red-400 font-medium">{missingResources.wEngineAscension.expert}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
