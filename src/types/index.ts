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
  expertChallengeMaterials: Record<string, number>;
  bossMaterials: Record<string, number>;
  hamsterCagePass: number;
  wEngineExpMaterials: WEngineExpMaterials;
  wEngineAscensionMaterials: Record<string, WEngineAscensionMaterials>;
}

export interface SkillLevels {
  basicAttack: number;
  dodge: number;
  assist: number;
  specialAttack: number;
  chainAttack: number;
}

export interface Character {
  id: string;
  name: string;
  class: string;
  element: string;
  hasWEngine: boolean;
  bossMaterial?: string;
  expertChallengeMaterial?: string;
}

export interface SkillLevelRequirements {
  basic: number;
  advanced: number;
  specialized: number;
  hamsterCagePass: number;
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
  skillLevels: Record<number, SkillLevelRequirements>;
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
  expertChallenge: Record<string, number>;
  bossMaterials: Record<string, number>;
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
  bossMaterialName?: string;
  expertChallengeMaterialName?: string;
}

export interface GameState {
  resources: Resources;
  selectedCharacters: string[];
}
