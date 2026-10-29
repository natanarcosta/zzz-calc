import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Resources, InvestigatorLogs, Seals, Chips, WEngineExpMaterials, WEngineAscensionMaterials } from '../types';
import { localStorage, STORAGE_KEYS } from '../lib/localStorage';

interface ResourceContextType {
  resources: Resources;
  updateDennies: (value: number) => void;
  updateInvestigatorLogs: (logs: Partial<InvestigatorLogs>) => void;
  updateSeals: (className: string, seals: Partial<Seals>) => void;
  updateChips: (element: string, chips: Partial<Chips>) => void;
  updateExpertChallengeMaterials: (value: number) => void;
  updateBossMaterials: (value: number) => void;
  updateHamsterCagePass: (value: number) => void;
  updateWEngineExpMaterials: (materials: Partial<WEngineExpMaterials>) => void;
  updateWEngineAscensionMaterials: (element: string, materials: Partial<WEngineAscensionMaterials>) => void;
  resetResources: () => void;
}

const initialResources: Resources = {
  dennies: 0,
  investigatorLogs: {
    trainee: 0,
    official: 0,
    senior: 0,
  },
  seals: {},
  chips: {},
  expertChallengeMaterials: 0,
  bossMaterials: 0,
  hamsterCagePass: 0,
  wEngineExpMaterials: {
    basic: 0,
    advanced: 0,
    expert: 0,
  },
  wEngineAscensionMaterials: {},
};

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resources>(() => {
    const saved = localStorage.get<Resources>(STORAGE_KEYS.RESOURCES);
    if (!saved) return initialResources;
    
    // Migrate wEngineAscensionMaterials from element-based to class-based
    const migrated = { ...initialResources, ...saved };
    if (saved.wEngineAscensionMaterials) {
      // If data exists, it might be element-based. We need to migrate it.
      // For now, just keep it as is - the UI will handle the migration
      migrated.wEngineAscensionMaterials = saved.wEngineAscensionMaterials;
    }
    return migrated;
  });

  useEffect(() => {
    localStorage.set(STORAGE_KEYS.RESOURCES, resources);
  }, [resources]);

  const updateDennies = (value: number) => {
    setResources((prev) => ({ ...prev, dennies: Math.max(0, value) }));
  };

  const updateInvestigatorLogs = (logs: Partial<InvestigatorLogs>) => {
    setResources((prev) => ({
      ...prev,
      investigatorLogs: {
        ...prev.investigatorLogs,
        ...logs,
        trainee: logs.trainee !== undefined ? Math.max(0, logs.trainee) : prev.investigatorLogs.trainee,
        official: logs.official !== undefined ? Math.max(0, logs.official) : prev.investigatorLogs.official,
        senior: logs.senior !== undefined ? Math.max(0, logs.senior) : prev.investigatorLogs.senior,
      },
    }));
  };

  const updateSeals = (className: string, seals: Partial<Seals>) => {
    setResources((prev) => ({
      ...prev,
      seals: {
        ...prev.seals,
        [className]: {
          basic: seals.basic !== undefined ? Math.max(0, seals.basic) : (prev.seals[className]?.basic || 0),
          advanced: seals.advanced !== undefined ? Math.max(0, seals.advanced) : (prev.seals[className]?.advanced || 0),
          topTier: seals.topTier !== undefined ? Math.max(0, seals.topTier) : (prev.seals[className]?.topTier || 0),
        },
      },
    }));
  };

  const updateChips = (element: string, chips: Partial<Chips>) => {
    setResources((prev) => ({
      ...prev,
      chips: {
        ...prev.chips,
        [element]: {
          basic: chips.basic !== undefined ? Math.max(0, chips.basic) : (prev.chips[element]?.basic || 0),
          advanced: chips.advanced !== undefined ? Math.max(0, chips.advanced) : (prev.chips[element]?.advanced || 0),
          specialized: chips.specialized !== undefined ? Math.max(0, chips.specialized) : (prev.chips[element]?.specialized || 0),
        },
      },
    }));
  };

  const updateExpertChallengeMaterials = (value: number) => {
    setResources((prev) => ({ ...prev, expertChallengeMaterials: Math.max(0, value) }));
  };

  const updateBossMaterials = (value: number) => {
    setResources((prev) => ({ ...prev, bossMaterials: Math.max(0, value) }));
  };

  const updateHamsterCagePass = (value: number) => {
    setResources((prev) => ({ ...prev, hamsterCagePass: Math.max(0, value) }));
  };

  const updateWEngineExpMaterials = (materials: Partial<WEngineExpMaterials>) => {
    setResources((prev) => ({
      ...prev,
      wEngineExpMaterials: {
        basic: materials.basic !== undefined ? Math.max(0, materials.basic) : (prev.wEngineExpMaterials?.basic ?? 0),
        advanced: materials.advanced !== undefined ? Math.max(0, materials.advanced) : (prev.wEngineExpMaterials?.advanced ?? 0),
        expert: materials.expert !== undefined ? Math.max(0, materials.expert) : (prev.wEngineExpMaterials?.expert ?? 0),
      },
    }));
  };

  const updateWEngineAscensionMaterials = (element: string, materials: Partial<WEngineAscensionMaterials>) => {
    setResources((prev) => ({
      ...prev,
      wEngineAscensionMaterials: {
        ...prev.wEngineAscensionMaterials,
        [element]: {
          basic: materials.basic !== undefined ? Math.max(0, materials.basic) : (prev.wEngineAscensionMaterials[element]?.basic || 0),
          advanced: materials.advanced !== undefined ? Math.max(0, materials.advanced) : (prev.wEngineAscensionMaterials[element]?.advanced || 0),
          expert: materials.expert !== undefined ? Math.max(0, materials.expert) : (prev.wEngineAscensionMaterials[element]?.expert || 0),
        },
      },
    }));
  };

  const resetResources = () => {
    setResources(initialResources);
  };

  return (
    <ResourceContext.Provider
      value={{
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
        resetResources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
};
