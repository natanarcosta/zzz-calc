import { Layout } from './components/layout/Layout';
import { ResourceInput } from './components/resource-input/ResourceInput';
import { CharacterSelector } from './components/character-selector/CharacterSelector';
import { ProgressDashboard } from './components/progress-dashboard/ProgressDashboard';
import { CharacterProvider } from './contexts/CharacterContext';
import { ResourceProvider } from './contexts/ResourceContext';

function App() {
  return (
    <CharacterProvider>
      <ResourceProvider>
        <Layout>
          <div className="flex gap-6">
            {/* Left sidebar - Character Selector */}
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-6">
                <CharacterSelector />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1 space-y-8">
              <ResourceInput />
              <ProgressDashboard />
            </div>
          </div>
        </Layout>
      </ResourceProvider>
    </CharacterProvider>
  );
}

export default App;
