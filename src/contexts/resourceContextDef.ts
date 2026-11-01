import { createContext } from 'react';
import type {
  Resources,
  InvestigatorLogs,
  Seals,
  Chips,
  WEngineExpMaterials,
  WEngineAscensionMaterials,
} from '../types';

export interface ResourceContextType {
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

export const initialResources: Resources = {
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

export const ResourceContext = createContext<ResourceContextType | undefined>(undefined);
