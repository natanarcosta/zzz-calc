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
    <header className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">ZZZ Resource Calculator</h1>
          <p className="text-sm text-gray-400">Zenless Zone Zero Character Progress Tracker</p>
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
