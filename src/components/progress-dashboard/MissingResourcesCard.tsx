import type { MissingResources } from '../../types';

interface MissingResourcesCardProps {
  missingResources: MissingResources;
}

export const MissingResourcesCard = ({ missingResources }: MissingResourcesCardProps) => {
  const hasMissing = 
    missingResources.exp > 0 ||
    missingResources.dennies > 0 ||
    missingResources.expertChallenge > 0 ||
    missingResources.bossMaterials > 0 ||
    missingResources.seals.basic > 0 ||
    missingResources.seals.advanced > 0 ||
    missingResources.seals.topTier > 0 ||
    missingResources.chips.basic > 0 ||
    missingResources.chips.advanced > 0 ||
    missingResources.chips.specialized > 0;

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
        {(missingResources.seals.basic > 0 || missingResources.seals.advanced > 0 || missingResources.seals.topTier > 0) && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p className="text-gray-400 text-sm mb-2">Seals:</p>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {missingResources.seals.basic > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Basic</span>
                  <span className="text-red-400 font-medium">{missingResources.seals.basic}</span>
                </div>
              )}
              {missingResources.seals.advanced > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Advanced</span>
                  <span className="text-red-400 font-medium">{missingResources.seals.advanced}</span>
                </div>
              )}
              {missingResources.seals.topTier > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Top-Tier</span>
                  <span className="text-red-400 font-medium">{missingResources.seals.topTier}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {(missingResources.chips.basic > 0 || missingResources.chips.advanced > 0 || missingResources.chips.specialized > 0) && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p className="text-gray-400 text-sm mb-2">Chips:</p>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {missingResources.chips.basic > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Basic</span>
                  <span className="text-red-400 font-medium">{missingResources.chips.basic}</span>
                </div>
              )}
              {missingResources.chips.advanced > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Advanced</span>
                  <span className="text-red-400 font-medium">{missingResources.chips.advanced}</span>
                </div>
              )}
              {missingResources.chips.specialized > 0 && (
                <div className="text-center">
                  <span className="text-gray-400 block">Specialized</span>
                  <span className="text-red-400 font-medium">{missingResources.chips.specialized}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
