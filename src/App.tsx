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
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="flex flex-col xl:flex-row gap-4 lg:gap-5 xl:items-start">
              <aside className="w-full xl:w-72 shrink-0">
                <CharacterSelector />
              </aside>
              <section className="flex-1 min-w-0">
                <ProgressDashboard />
              </section>
            </div>
            <ResourceInput compact />
          </div>
        </Layout>
      </ResourceProvider>
    </CharacterProvider>
  );
}

export default App;
