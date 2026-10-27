import { useState, useEffect } from 'react';
import type { Resources, InvestigatorLogs, Seals, Chips } from '../types';
import { localStorage, STORAGE_KEYS } from '../lib/localStorage';

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
};

export const useResources = () => {
  const [resources, setResources] = useState<Resources>(() => {
    const saved = localStorage.get<Resources>(STORAGE_KEYS.RESOURCES);
    return saved || initialResources;
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

  const resetResources = () => {
    setResources(initialResources);
  };

  return {
    resources,
    updateDennies,
    updateInvestigatorLogs,
    updateSeals,
    updateChips,
    updateExpertChallengeMaterials,
    updateBossMaterials,
    resetResources,
  };
};
