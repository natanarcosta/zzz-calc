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
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Top Section: Agent Directory & Progress Dashboard */}
            <div className="flex flex-col xl:flex-row gap-5 lg:gap-6 xl:items-start">
              <aside className="w-full xl:w-80 shrink-0">
                <CharacterSelector />
              </aside>
              <section className="flex-1 min-w-0">
                <ProgressDashboard />
              </section>
            </div>

            {/* Bottom Section: Warehouse Resource Inventory */}
            <section className="w-full">
              <ResourceInput />
            </section>
          </div>
        </Layout>
      </ResourceProvider>
    </CharacterProvider>
  );
}

export default App;
