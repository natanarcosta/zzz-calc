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

export interface Resources {
  dennies: number;
  investigatorLogs: InvestigatorLogs;
  seals: Record<string, Seals>;
  chips: Record<string, Chips>;
  expertChallengeMaterials: number;
  bossMaterials: number;
}

export interface Character {
  id: string;
  name: string;
  class: string;
  element: string;
}

export interface CharacterRequirements {
  maxLevel: number;
  totalExp: number;
  totalDennies: number;
  seals: Seals;
  chips: Chips;
  expertChallengeMaterials: number;
  bossMaterials: number;
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
}

export interface ProgressData {
  exp: number;
  seals: number;
  chips: number;
  dennies: number;
  expertChallenge: number;
  bossMaterials: number;
  total: number;
  missing: MissingResources;
}

export interface GameState {
  resources: Resources;
  selectedCharacters: string[];
}
