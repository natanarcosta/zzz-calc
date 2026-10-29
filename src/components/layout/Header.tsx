import { useResources } from '../../contexts/ResourceContext';
import { RotateCcw } from 'lucide-react';

export const Header = () => {
  const { resetResources } = useResources();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all resources? This cannot be undone.')) {
      resetResources();
    }
  };

  return (
    <header className="shrink-0 bg-gray-900 border-b border-gray-800 px-4 py-3 lg:px-5">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-xl lg:text-2xl font-bold text-white truncate">ZZZ Resource Calculator</h1>
          <p className="text-xs lg:text-sm text-gray-400 hidden sm:block">
            Zenless Zone Zero Character Progress Tracker
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>
    </header>
  );
};
