import { useState, useEffect } from 'react';
import type { Resources, Seals, Chips, WEngineExpMaterials, WEngineAscensionMaterials } from '../types';
import { localStorage } from '../lib/localStorage';

const INITIAL_RESOURCES: Resources = {
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

export const useResources = () => {
  const [resources, setResources] = useState<Resources>(() => {
    const saved = localStorage.get<Resources>('resources');
    return saved || INITIAL_RESOURCES;
  });

  useEffect(() => {
    localStorage.set('resources', resources);
  }, [resources]);

  const updateDennies = (value: number) => {
    setResources((prev) => ({ ...prev, dennies: Math.max(0, value) }));
  };

  const updateInvestigatorLogs = (type: keyof typeof resources.investigatorLogs, value: number) => {
    setResources((prev) => ({
      ...prev,
      investigatorLogs: {
        ...prev.investigatorLogs,
        [type]: Math.max(0, value),
      },
    }));
  };

  const updateSeals = (classType: string, sealType: keyof Seals, value: number) => {
    setResources((prev) => {
      const classSeals = prev.seals[classType] || { basic: 0, advanced: 0, topTier: 0 };
      return {
        ...prev,
        seals: {
          ...prev.seals,
          [classType]: {
            ...classSeals,
            [sealType]: Math.max(0, value),
          },
        },
      };
    });
  };

  const updateChips = (elementType: string, chipType: keyof Chips, value: number) => {
    setResources((prev) => {
      const elementChips = prev.chips[elementType] || { basic: 0, advanced: 0, specialized: 0 };
      return {
        ...prev,
        chips: {
          ...prev.chips,
          [elementType]: {
            ...elementChips,
            [chipType]: Math.max(0, value),
          },
        },
      };
    });
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

  const updateWEngineExpMaterials = (type: keyof WEngineExpMaterials, value: number) => {
    setResources((prev) => ({
      ...prev,
      wEngineExpMaterials: {
        ...prev.wEngineExpMaterials,
        [type]: Math.max(0, value),
      },
    }));
  };

  const updateWEngineAscensionMaterials = (element: string, type: keyof WEngineAscensionMaterials, value: number) => {
    setResources((prev) => {
      const elementMaterials = prev.wEngineAscensionMaterials[element] || { basic: 0, advanced: 0, expert: 0 };
      return {
        ...prev,
        wEngineAscensionMaterials: {
          ...prev.wEngineAscensionMaterials,
          [element]: {
            ...elementMaterials,
            [type]: Math.max(0, value),
          },
        },
      };
    });
  };

  const resetResources = () => {
    setResources(INITIAL_RESOURCES);
  };

  return {
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
  };
};
