export interface InvestigatorLogs {
  trainee: number;
  official: number;
  senior: number;
}

export interface Seals {
  basic: number;
  advanced: number;
  topTier: number;
}

export interface Chips {
  basic: number;
  advanced: number;
  specialized: number;
}

export interface WEngineExpMaterials {
  basic: number;
  advanced: number;
  expert: number;
}

export interface WEngineAscensionMaterials {
  basic: number;
  advanced: number;
  expert: number;
}

export interface Resources {
  dennies: number;
  investigatorLogs: InvestigatorLogs;
  seals: Record<string, Seals>;
  chips: Record<string, Chips>;
  expertChallengeMaterials: number;
  bossMaterials: number;
  hamsterCagePass: number;
  wEngineExpMaterials: WEngineExpMaterials;
  wEngineAscensionMaterials: Record<string, WEngineAscensionMaterials>;
}

export interface Character {
  id: string;
  name: string;
  class: string;
  element: string;
  hasWEngine: boolean;
}

export interface CharacterRequirements {
  maxLevel: number;
  totalExp: number;
  totalDennies: number;
  seals: Seals;
  chips: Chips;
  expertChallengeMaterials: number;
  bossMaterials: number;
  hamsterCagePass: number;
  wEngineExp: number;
  wEngineAscension: WEngineAscensionMaterials;
}

export interface GameData {
  classes: string[];
  elements: string[];
  expSources: {
    trainee: number;
    official: number;
    senior: number;
  };
  characterRequirements: CharacterRequirements;
  characters: Character[];
}

export interface MissingResources {
  exp: number;
  seals: Seals;
  chips: Chips;
  dennies: number;
  expertChallenge: number;
  bossMaterials: number;
  hamsterCagePass: number;
  wEngineExp: number;
  wEngineAscension: WEngineAscensionMaterials;
}

export interface ProgressData {
  exp: number;
  seals: number;
  chips: number;
  dennies: number;
  expertChallenge: number;
  bossMaterials: number;
  hamsterCagePass: number;
  wEngineExp: number;
  wEngineAscension: number;
  total: number;
  missing: MissingResources;
}

export interface GameState {
  resources: Resources;
  selectedCharacters: string[];
}
