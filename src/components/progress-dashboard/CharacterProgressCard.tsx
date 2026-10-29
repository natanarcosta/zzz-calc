import type { Character, ProgressData } from '../../types';

interface CharacterProgressCardProps {
  character: Character;
  progress: ProgressData;
}

const ProgressBar = ({ label, value }: { label: string; value: number }) => {
  const getColor = (val: number) => {
    if (val >= 100) return 'bg-green-500';
    if (val >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className={`font-medium ${value >= 100 ? 'text-green-400' : value >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`${getColor(value)} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
};

export const CharacterProgressCard = ({ character, progress }: CharacterProgressCardProps) => {
  return (
    <div className="p-4 lg:p-5 bg-gray-900 rounded-lg border border-gray-700/90 shadow-sm shadow-black/20">
      <div className="border-b border-gray-700 pb-3">
        <h3 className="text-lg font-bold text-white">{character.name}</h3>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{character.class}</span>
          <span>•</span>
          <span>{character.element}</span>
        </div>
      </div>

      <div className="space-y-3 pt-3">
        <ProgressBar label="EXP" value={progress.exp} />
        <ProgressBar label="Seals" value={progress.seals} />
        <ProgressBar label="Chips" value={progress.chips} />
        <ProgressBar label="Dennies" value={progress.dennies} />
        <ProgressBar label="Expert Challenge" value={progress.expertChallenge} />
        <ProgressBar label="Boss Materials" value={progress.bossMaterials} />
        <ProgressBar label="Hamster Cage Pass" value={progress.hamsterCagePass} />
        {character.hasWEngine && (
          <>
            <ProgressBar label="W-Engine EXP" value={progress.wEngineExp} />
            <ProgressBar label="W-Engine Ascension" value={progress.wEngineAscension} />
          </>
        )}
      </div>

      <div className="border-t border-gray-700 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300">Total Progress</span>
          <span className={`text-lg font-bold ${progress.total >= 100 ? 'text-green-400' : progress.total >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {progress.total.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              progress.total >= 100 ? 'bg-green-500' : progress.total >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, progress.total)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
