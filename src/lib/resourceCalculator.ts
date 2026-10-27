import type { Character, Resources, ProgressData, Seals, Chips, MissingResources, CharacterRequirements } from '../types';

/**
 * Calculate EXP progress based on investigator logs
 * Formula: (trainee * 100 + official * 600 + senior * 3000) / (900000 * characterCount) * 100
 */
export const calculateExpProgress = (
  logs: { trainee: number; official: number; senior: number },
  totalExpNeeded: number = 900000,
  characterCount: number = 1
): number => {
  const totalExp = logs.trainee * 100 + logs.official * 600 + logs.senior * 3000;
  const totalNeeded = totalExpNeeded * characterCount;
  const progress = (totalExp / totalNeeded) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Seals progress for a specific class
 * Takes into account that seals can be converted between tiers:
 * 3 Basic = 1 Advanced, 3 Advanced = 1 Top-Tier
 * Progress is calculated in "basic units" where:
 * 1 Basic = 1 unit, 1 Advanced = 3 units, 1 Top-Tier = 9 units
 */
export const calculateSealsProgress = (
  seals: Seals,
  requirements: Seals,
  characterCountOfClass: number = 1
): number => {
  // Convert owned seals to basic units
  const ownedUnits = seals.basic * 1 + seals.advanced * 3 + seals.topTier * 9;
  
  // Calculate required seals in basic units (multiplied by character count)
  const requiredBasic = requirements.basic * characterCountOfClass;
  const requiredAdvanced = requirements.advanced * characterCountOfClass;
  const requiredTopTier = requirements.topTier * characterCountOfClass;
  const requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredTopTier * 9;
  
  const progress = (ownedUnits / requiredUnits) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Chips progress for a specific element
 * Takes into account that chips can be converted between tiers:
 * 3 Basic = 1 Advanced, 3 Advanced = 1 Specialized
 * Progress is calculated in "basic units" where:
 * 1 Basic = 1 unit, 1 Advanced = 3 units, 1 Specialized = 9 units
 */
export const calculateChipsProgress = (
  chips: Chips,
  requirements: Chips,
  characterCountOfElement: number = 1
): number => {
  // Convert owned chips to basic units
  const ownedUnits = chips.basic * 1 + chips.advanced * 3 + chips.specialized * 9;
  
  // Calculate required chips in basic units (multiplied by character count)
  const requiredBasic = requirements.basic * characterCountOfElement;
  const requiredAdvanced = requirements.advanced * characterCountOfElement;
  const requiredSpecialized = requirements.specialized * characterCountOfElement;
  const requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredSpecialized * 9;
  
  const progress = (ownedUnits / requiredUnits) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Dennies progress
 * Formula: (dennies / (totalDennies * characterCount)) * 100
 * Dennies are shared among all selected characters
 */
export const calculateDenniesProgress = (
  dennies: number,
  totalDenniesNeeded: number = 3700000,
  characterCount: number = 1
): number => {
  const totalNeeded = totalDenniesNeeded * characterCount;
  const progress = (dennies / totalNeeded) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Expert Challenge Materials progress
 * Formula: (materials / (60 * characterCount)) * 100
 */
export const calculateExpertChallengeProgress = (
  materials: number,
  totalNeeded: number = 60,
  characterCount: number = 1
): number => {
  const totalNeededForAll = totalNeeded * characterCount;
  const progress = (materials / totalNeededForAll) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Boss Materials progress
 * Formula: (materials / (9 * characterCount)) * 100
 */
export const calculateBossMaterialsProgress = (
  materials: number,
  totalNeeded: number = 9,
  characterCount: number = 1
): number => {
  const totalNeededForAll = totalNeeded * characterCount;
  const progress = (materials / totalNeededForAll) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate missing resources for a character
 * Takes into account tier conversion for seals and chips
 */
export const calculateMissingResources = (
  character: Character,
  resources: Resources,
  requirements: CharacterRequirements,
  selectedCharacterCount: number,
  charactersWithSameClass: number = 1,
  charactersWithSameElement: number = 1
): MissingResources => {
  const totalExp = resources.investigatorLogs.trainee * 100 + 
                  resources.investigatorLogs.official * 600 + 
                  resources.investigatorLogs.senior * 3000;
  
  const totalExpNeeded = requirements.totalExp * selectedCharacterCount;
  const missingExp = Math.max(0, totalExpNeeded - totalExp);
  
  const characterSeals = resources.seals[character.class] || { basic: 0, advanced: 0, topTier: 0 };
  
  // Calculate required seals in basic units
  const requiredBasic = requirements.seals.basic * charactersWithSameClass;
  const requiredAdvanced = requirements.seals.advanced * charactersWithSameClass;
  const requiredTopTier = requirements.seals.topTier * charactersWithSameClass;
  const requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredTopTier * 9;
  
  // Convert owned seals to basic units
  const ownedUnits = characterSeals.basic * 1 + characterSeals.advanced * 3 + characterSeals.topTier * 9;
  
  // Calculate missing in basic units
  const missingUnits = Math.max(0, requiredUnits - ownedUnits);
  
  // Convert missing units back to optimal tier distribution
  const missingTopTier = Math.floor(missingUnits / 9);
  const remainingAfterTopTier = missingUnits % 9;
  const missingAdvanced = Math.floor(remainingAfterTopTier / 3);
  const missingBasic = remainingAfterTopTier % 3;
  
  const missingSeals: Seals = {
    basic: missingBasic,
    advanced: missingAdvanced,
    topTier: missingTopTier,
  };
  
  const characterChips = resources.chips[character.element] || { basic: 0, advanced: 0, specialized: 0 };
  
  // Calculate required chips in basic units
  const requiredChipBasic = requirements.chips.basic * charactersWithSameElement;
  const requiredChipAdvanced = requirements.chips.advanced * charactersWithSameElement;
  const requiredChipSpecialized = requirements.chips.specialized * charactersWithSameElement;
  const requiredChipUnits = requiredChipBasic * 1 + requiredChipAdvanced * 3 + requiredChipSpecialized * 9;
  
  // Convert owned chips to basic units
  const ownedChipUnits = characterChips.basic * 1 + characterChips.advanced * 3 + characterChips.specialized * 9;
  
  // Calculate missing in basic units
  const missingChipUnits = Math.max(0, requiredChipUnits - ownedChipUnits);
  
  // Convert missing units back to optimal tier distribution
  const missingSpecialized = Math.floor(missingChipUnits / 9);
  const remainingAfterSpecialized = missingChipUnits % 9;
  const missingChipAdvanced = Math.floor(remainingAfterSpecialized / 3);
  const missingChipBasic = remainingAfterSpecialized % 3;
  
  const missingChips: Chips = {
    basic: missingChipBasic,
    advanced: missingChipAdvanced,
    specialized: missingSpecialized,
  };
  
  const totalDenniesNeeded = requirements.totalDennies * selectedCharacterCount;
  const missingDennies = Math.max(0, totalDenniesNeeded - resources.dennies);
  
  const totalExpertChallengeNeeded = requirements.expertChallengeMaterials * selectedCharacterCount;
  const missingExpertChallenge = Math.max(0, totalExpertChallengeNeeded - resources.expertChallengeMaterials);
  
  const totalBossMaterialsNeeded = requirements.bossMaterials * selectedCharacterCount;
  const missingBossMaterials = Math.max(0, totalBossMaterialsNeeded - resources.bossMaterials);
  
  return {
    exp: missingExp,
    seals: missingSeals,
    chips: missingChips,
    dennies: missingDennies,
    expertChallenge: missingExpertChallenge,
    bossMaterials: missingBossMaterials,
  };
};

/**
 * Calculate total progress for a character
 * Returns progress percentages for all resource types and overall progress
 */
export const calculateTotalProgress = (
  character: Character,
  resources: Resources,
  requirements: CharacterRequirements,
  selectedCharacters: Character[]
): ProgressData => {
  const selectedCharacterCount = selectedCharacters.length;
  
  const exp = calculateExpProgress(resources.investigatorLogs, requirements.totalExp, selectedCharacterCount);
  
  const characterSeals = resources.seals[character.class] || { basic: 0, advanced: 0, topTier: 0 };
  const charactersWithSameClass = selectedCharacters.filter(c => c.class === character.class).length;
  const seals = calculateSealsProgress(characterSeals, requirements.seals, charactersWithSameClass);
  
  const characterChips = resources.chips[character.element] || { basic: 0, advanced: 0, specialized: 0 };
  const charactersWithSameElement = selectedCharacters.filter(c => c.element === character.element).length;
  const chips = calculateChipsProgress(characterChips, requirements.chips, charactersWithSameElement);
  
  const dennies = calculateDenniesProgress(resources.dennies, requirements.totalDennies, selectedCharacterCount);
  
  const expertChallenge = calculateExpertChallengeProgress(resources.expertChallengeMaterials, requirements.expertChallengeMaterials, selectedCharacterCount);
  const bossMaterials = calculateBossMaterialsProgress(resources.bossMaterials, requirements.bossMaterials, selectedCharacterCount);
  
  const total = (exp + seals + chips + dennies + expertChallenge + bossMaterials) / 6;
  
  const missing = calculateMissingResources(character, resources, requirements, selectedCharacterCount, charactersWithSameClass, charactersWithSameElement);
  
  return {
    exp,
    seals,
    chips,
    dennies,
    expertChallenge,
    bossMaterials,
    total,
    missing,
  };
};
