import type { Character, Resources, ProgressData, Seals, Chips, MissingResources, CharacterRequirements, SkillLevels, SkillLevelRequirements } from '../types';

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
  characterCountOfElement: number = 1,
  skillLevels?: SkillLevels[],
  skillRequirements?: Record<number, SkillLevelRequirements>
): number => {
  // Convert owned chips to basic units
  const ownedUnits = chips.basic * 1 + chips.advanced * 3 + chips.specialized * 9;
  
  let requiredUnits: number;
  
  // If skill levels are provided, calculate based on actual skill requirements
  if (skillLevels && skillRequirements) {
    const totalSkillRequirements = skillLevels.reduce((acc, levels) => {
      const skillReqs = calculateSkillChipsRequirements(levels, skillRequirements);
      return {
        basic: acc.basic + skillReqs.basic,
        advanced: acc.advanced + skillReqs.advanced,
        specialized: acc.specialized + skillReqs.specialized,
      };
    }, { basic: 0, advanced: 0, specialized: 0 });
    
    requiredUnits = totalSkillRequirements.basic * 1 + totalSkillRequirements.advanced * 3 + totalSkillRequirements.specialized * 9;
  } else {
    // Fallback to old calculation with hardcoded requirements
    const requiredBasic = requirements.basic * characterCountOfElement;
    const requiredAdvanced = requirements.advanced * characterCountOfElement;
    const requiredSpecialized = requirements.specialized * characterCountOfElement;
    requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredSpecialized * 9;
  }
  
  const progress = (ownedUnits / requiredUnits) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate Hamster Cage Pass progress
 * Formula: (pass / (5 * characterCount)) * 100
 */
export const calculateHamsterCagePassProgress = (
  pass: number | undefined,
  totalNeeded: number = 5,
  characterCount: number = 1,
  skillLevels?: SkillLevels[],
  skillRequirements?: Record<number, SkillLevelRequirements>
): number => {
  const safePass = pass ?? 0;
  
  let totalNeededForAll: number;
  
  // If skill levels are provided, calculate based on actual skill requirements
  if (skillLevels && skillRequirements) {
    const totalSkillRequirements = skillLevels.reduce((acc, levels) => {
      return acc + calculateSkillHamsterCagePassRequirements(levels, skillRequirements);
    }, 0);
    totalNeededForAll = totalSkillRequirements;
  } else {
    // Fallback to old calculation with hardcoded requirements
    totalNeededForAll = totalNeeded * characterCount;
  }
  
  const progress = (safePass / totalNeededForAll) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate total chip requirements based on skill levels
 * Sums up chip requirements for all 5 skills at their current levels
 */
export const calculateSkillChipsRequirements = (
  skillLevels: SkillLevels,
  skillRequirements: Record<number, SkillLevelRequirements>
): Chips => {
  const basicAttackReqs = skillRequirements[skillLevels.basicAttack] || { basic: 0, advanced: 0, specialized: 0 };
  const dodgeReqs = skillRequirements[skillLevels.dodge] || { basic: 0, advanced: 0, specialized: 0 };
  const assistReqs = skillRequirements[skillLevels.assist] || { basic: 0, advanced: 0, specialized: 0 };
  const specialAttackReqs = skillRequirements[skillLevels.specialAttack] || { basic: 0, advanced: 0, specialized: 0 };
  const chainAttackReqs = skillRequirements[skillLevels.chainAttack] || { basic: 0, advanced: 0, specialized: 0 };

  const totalBasic = 
    basicAttackReqs.basic +
    dodgeReqs.basic +
    assistReqs.basic +
    specialAttackReqs.basic +
    chainAttackReqs.basic;

  const totalAdvanced = 
    basicAttackReqs.advanced +
    dodgeReqs.advanced +
    assistReqs.advanced +
    specialAttackReqs.advanced +
    chainAttackReqs.advanced;

  const totalSpecialized = 
    basicAttackReqs.specialized +
    dodgeReqs.specialized +
    assistReqs.specialized +
    specialAttackReqs.specialized +
    chainAttackReqs.specialized;

  return {
    basic: totalBasic,
    advanced: totalAdvanced,
    specialized: totalSpecialized,
  };
};

/**
 * Calculate total hamster cage pass requirements based on skill levels
 * Sums up hamster cage pass requirements for all 5 skills at their current levels
 */
export const calculateSkillHamsterCagePassRequirements = (
  skillLevels: SkillLevels,
  skillRequirements: Record<number, SkillLevelRequirements>
): number => {
  const basicAttackReqs = skillRequirements[skillLevels.basicAttack] || { hamsterCagePass: 0 };
  const dodgeReqs = skillRequirements[skillLevels.dodge] || { hamsterCagePass: 0 };
  const assistReqs = skillRequirements[skillLevels.assist] || { hamsterCagePass: 0 };
  const specialAttackReqs = skillRequirements[skillLevels.specialAttack] || { hamsterCagePass: 0 };
  const chainAttackReqs = skillRequirements[skillLevels.chainAttack] || { hamsterCagePass: 0 };

  return (
    basicAttackReqs.hamsterCagePass +
    dodgeReqs.hamsterCagePass +
    assistReqs.hamsterCagePass +
    specialAttackReqs.hamsterCagePass +
    chainAttackReqs.hamsterCagePass
  );
};

/**
 * Calculate W-Engine EXP progress
 * Formula: (totalExp / (600000 * wEngineCount)) * 100
 */
export const calculateWEngineExpProgress = (
  materials: { basic: number; advanced: number; expert: number } | undefined,
  totalExpNeeded: number = 600000,
  wEngineCount: number = 1
): number => {
  const safeMaterials = materials || { basic: 0, advanced: 0, expert: 0 };
  const totalExp = safeMaterials.basic * 100 + safeMaterials.advanced * 600 + safeMaterials.expert * 3000;
  const totalNeeded = totalExpNeeded * wEngineCount;
  const progress = (totalExp / totalNeeded) * 100;
  return Math.min(100, Math.max(0, progress));
};

/**
 * Calculate W-Engine Ascension Materials progress
 * Takes into account that materials can be converted between tiers:
 * 3 Basic = 1 Advanced, 3 Advanced = 1 Expert
 * Progress is calculated in "basic units" where:
 * 1 Basic = 1 unit, 1 Advanced = 3 units, 1 Expert = 9 units
 */
export const calculateWEngineAscensionProgress = (
  materials: { basic: number; advanced: number; expert: number },
  requirements: { basic: number; advanced: number; expert: number },
  wEngineCount: number = 1
): number => {
  // Convert owned materials to basic units
  const ownedUnits = materials.basic * 1 + materials.advanced * 3 + materials.expert * 9;
  
  // Calculate required materials in basic units (multiplied by w-engine count)
  const requiredBasic = requirements.basic * wEngineCount;
  const requiredAdvanced = requirements.advanced * wEngineCount;
  const requiredExpert = requirements.expert * wEngineCount;
  const requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredExpert * 9;
  
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

const calculateSharedMissingResources = (
  resources: Resources,
  requirements: CharacterRequirements,
  selectedCharacterCount: number,
  skillLevels?: SkillLevels[]
): Pick<MissingResources, 'exp' | 'dennies' | 'expertChallenge' | 'bossMaterials' | 'hamsterCagePass'> => {
  const totalExp =
    resources.investigatorLogs.trainee * 100 +
    resources.investigatorLogs.official * 600 +
    resources.investigatorLogs.senior * 3000;
  const totalExpNeeded = requirements.totalExp * selectedCharacterCount;
  const missingExp = Math.max(0, totalExpNeeded - totalExp);

  const totalDenniesNeeded = requirements.totalDennies * selectedCharacterCount;
  const missingDennies = Math.max(0, totalDenniesNeeded - resources.dennies);

  const totalExpertChallengeNeeded =
    requirements.expertChallengeMaterials * selectedCharacterCount;
  const missingExpertChallenge = Math.max(
    0,
    totalExpertChallengeNeeded - resources.expertChallengeMaterials
  );

  const totalBossMaterialsNeeded = requirements.bossMaterials * selectedCharacterCount;
  const missingBossMaterials = Math.max(
    0,
    totalBossMaterialsNeeded - resources.bossMaterials
  );

  let totalHamsterCagePassNeeded: number;
  if (skillLevels && requirements.skillLevels) {
    totalHamsterCagePassNeeded = skillLevels.reduce((acc, levels) => {
      return acc + calculateSkillHamsterCagePassRequirements(levels, requirements.skillLevels);
    }, 0);
  } else {
    totalHamsterCagePassNeeded = requirements.hamsterCagePass * selectedCharacterCount;
  }
  const missingHamsterCagePass = Math.max(0, totalHamsterCagePassNeeded - resources.hamsterCagePass);

  return {
    exp: missingExp,
    dennies: missingDennies,
    expertChallenge: missingExpertChallenge,
    bossMaterials: missingBossMaterials,
    hamsterCagePass: missingHamsterCagePass,
  };
};

const calculateMissingSealsForClass = (
  seals: Seals,
  requirements: Seals,
  charactersWithSameClass: number
): Seals => {
  const requiredBasic = requirements.basic * charactersWithSameClass;
  const requiredAdvanced = requirements.advanced * charactersWithSameClass;
  const requiredTopTier = requirements.topTier * charactersWithSameClass;
  const requiredUnits =
    requiredBasic * 1 + requiredAdvanced * 3 + requiredTopTier * 9;

  const ownedUnits = seals.basic * 1 + seals.advanced * 3 + seals.topTier * 9;
  const missingUnits = Math.max(0, requiredUnits - ownedUnits);

  const missingTopTier = Math.floor(missingUnits / 9);
  const remainingAfterTopTier = missingUnits % 9;
  const missingAdvanced = Math.floor(remainingAfterTopTier / 3);
  const missingBasic = remainingAfterTopTier % 3;

  return {
    basic: missingBasic,
    advanced: missingAdvanced,
    topTier: missingTopTier,
  };
};

const calculateMissingChipsForElement = (
  chips: Chips,
  requirements: Chips,
  charactersWithSameElement: number,
  skillLevels?: SkillLevels[],
  skillRequirements?: Record<number, SkillLevelRequirements>
): Chips => {
  let requiredChipUnits: number;

  if (skillLevels && skillRequirements) {
    const totalSkillRequirements = skillLevels.reduce((acc, levels) => {
      const skillReqs = calculateSkillChipsRequirements(levels, skillRequirements);
      return {
        basic: acc.basic + skillReqs.basic,
        advanced: acc.advanced + skillReqs.advanced,
        specialized: acc.specialized + skillReqs.specialized,
      };
    }, { basic: 0, advanced: 0, specialized: 0 });
    
    requiredChipUnits = totalSkillRequirements.basic * 1 + totalSkillRequirements.advanced * 3 + totalSkillRequirements.specialized * 9;
  } else {
    const requiredChipBasic = requirements.basic * charactersWithSameElement;
    const requiredChipAdvanced = requirements.advanced * charactersWithSameElement;
    const requiredChipSpecialized = requirements.specialized * charactersWithSameElement;
    requiredChipUnits =
      requiredChipBasic * 1 + requiredChipAdvanced * 3 + requiredChipSpecialized * 9;
  }

  const ownedChipUnits =
    chips.basic * 1 + chips.advanced * 3 + chips.specialized * 9;
  const missingChipUnits = Math.max(0, requiredChipUnits - ownedChipUnits);

  const missingSpecialized = Math.floor(missingChipUnits / 9);
  const remainingAfterSpecialized = missingChipUnits % 9;
  const missingChipAdvanced = Math.floor(remainingAfterSpecialized / 3);
  const missingChipBasic = remainingAfterSpecialized % 3;

  return {
    basic: missingChipBasic,
    advanced: missingChipAdvanced,
    specialized: missingSpecialized,
  };
};

const addSeals = (a: Seals, b: Seals): Seals => ({
  basic: a.basic + b.basic,
  advanced: a.advanced + b.advanced,
  topTier: a.topTier + b.topTier,
});

const addChips = (a: Chips, b: Chips): Chips => ({
  basic: a.basic + b.basic,
  advanced: a.advanced + b.advanced,
  specialized: a.specialized + b.specialized,
});

const addWEngineAscension = (
  a: { basic: number; advanced: number; expert: number },
  b: { basic: number; advanced: number; expert: number }
): { basic: number; advanced: number; expert: number } => ({
  basic: a.basic + b.basic,
  advanced: a.advanced + b.advanced,
  expert: a.expert + b.expert,
});

const calculateMissingWEngineExp = (
  materials: { basic: number; advanced: number; expert: number } | undefined,
  totalExpNeeded: number = 600000,
  wEngineCount: number = 1
): number => {
  const safeMaterials = materials || { basic: 0, advanced: 0, expert: 0 };
  const totalExp = safeMaterials.basic * 100 + safeMaterials.advanced * 600 + safeMaterials.expert * 3000;
  const totalNeeded = totalExpNeeded * wEngineCount;
  return Math.max(0, totalNeeded - totalExp);
};

const calculateMissingWEngineAscension = (
  materials: { basic: number; advanced: number; expert: number },
  requirements: { basic: number; advanced: number; expert: number },
  wEngineCount: number = 1
): { basic: number; advanced: number; expert: number } => {
  const requiredBasic = requirements.basic * wEngineCount;
  const requiredAdvanced = requirements.advanced * wEngineCount;
  const requiredExpert = requirements.expert * wEngineCount;
  const requiredUnits = requiredBasic * 1 + requiredAdvanced * 3 + requiredExpert * 9;

  const ownedUnits = materials.basic * 1 + materials.advanced * 3 + materials.expert * 9;
  const missingUnits = Math.max(0, requiredUnits - ownedUnits);

  const missingExpert = Math.floor(missingUnits / 9);
  const remainingAfterExpert = missingUnits % 9;
  const missingAdvanced = Math.floor(remainingAfterExpert / 3);
  const missingBasic = remainingAfterExpert % 3;

  return {
    basic: missingBasic,
    advanced: missingAdvanced,
    expert: missingExpert,
  };
};

/**
 * Missing resources for all selected characters (shared pools counted once).
 */
export const calculateCombinedMissingResources = (
  resources: Resources,
  requirements: CharacterRequirements,
  selectedCharacters: Character[],
  characterSkillLevels?: Record<string, SkillLevels>
): MissingResources => {
  const selectedCharacterCount = selectedCharacters.length;
  
  // Collect skill levels for all selected characters
  const skillLevelsArray = characterSkillLevels 
    ? selectedCharacters.map(c => characterSkillLevels[c.id] || { basicAttack: 1, dodge: 1, assist: 1, specialAttack: 1, chainAttack: 1 })
    : undefined;
  
  const shared = calculateSharedMissingResources(
    resources,
    requirements,
    selectedCharacterCount,
    skillLevelsArray
  );

  const uniqueClasses = [...new Set(selectedCharacters.map((c) => c.class))];
  const missingSeals = uniqueClasses.reduce(
    (acc, className) => {
      const count = selectedCharacters.filter((c) => c.class === className).length;
      const classSeals = resources.seals[className] || { basic: 0, advanced: 0, topTier: 0 };
      return addSeals(
        acc,
        calculateMissingSealsForClass(classSeals, requirements.seals, count)
      );
    },
    { basic: 0, advanced: 0, topTier: 0 } as Seals
  );

  const uniqueElements = [...new Set(selectedCharacters.map((c) => c.element))];
  const missingChips = uniqueElements.reduce(
    (acc, element) => {
      const count = selectedCharacters.filter((c) => c.element === element).length;
      const elementChips = resources.chips[element] || {
        basic: 0,
        advanced: 0,
        specialized: 0,
      };
      const elementSkillLevels = selectedCharacters
        .filter(c => c.element === element)
        .map(c => characterSkillLevels?.[c.id] || { basicAttack: 1, dodge: 1, assist: 1, specialAttack: 1, chainAttack: 1 });
      return addChips(
        acc,
        calculateMissingChipsForElement(elementChips, requirements.chips, count, elementSkillLevels, requirements.skillLevels)
      );
    },
    { basic: 0, advanced: 0, specialized: 0 } as Chips
  );

  // Calculate W-Engine missing resources for characters with W-Engine
  const charactersWithWEngine = selectedCharacters.filter((c) => c.hasWEngine);
  const wEngineCount = charactersWithWEngine.length;
  
  const missingWEngineExp = calculateMissingWEngineExp(
    resources.wEngineExpMaterials || { basic: 0, advanced: 0, expert: 0 },
    requirements.wEngineExp,
    wEngineCount
  );

  const uniqueWEngineClasses = [...new Set(charactersWithWEngine.map((c) => c.class))];
  const missingWEngineAscension = uniqueWEngineClasses.reduce(
    (acc, className) => {
      const count = charactersWithWEngine.filter((c) => c.class === className).length;
      const classMaterials = (resources.wEngineAscensionMaterials && resources.wEngineAscensionMaterials[className]) || {
        basic: 0,
        advanced: 0,
        expert: 0,
      };
      return addWEngineAscension(
        acc,
        calculateMissingWEngineAscension(classMaterials, requirements.wEngineAscension, count)
      );
    },
    { basic: 0, advanced: 0, expert: 0 }
  );

  return {
    ...shared,
    seals: missingSeals,
    chips: missingChips,
    wEngineExp: missingWEngineExp,
    wEngineAscension: missingWEngineAscension,
  };
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
  charactersWithSameElement: number = 1,
  skillLevels?: SkillLevels
): MissingResources => {
  const skillLevelsArray = skillLevels ? [skillLevels] : undefined;
  const shared = calculateSharedMissingResources(
    resources,
    requirements,
    selectedCharacterCount,
    skillLevelsArray
  );

  const characterSeals = resources.seals[character.class] || { basic: 0, advanced: 0, topTier: 0 };
  const missingSeals = calculateMissingSealsForClass(
    characterSeals,
    requirements.seals,
    charactersWithSameClass
  );

  const characterChips = resources.chips[character.element] || {
    basic: 0,
    advanced: 0,
    specialized: 0,
  };
  const elementSkillLevels = skillLevels ? [skillLevels] : undefined;
  const missingChips = calculateMissingChipsForElement(
    characterChips,
    requirements.chips,
    charactersWithSameElement,
    elementSkillLevels,
    requirements.skillLevels
  );

  // Calculate W-Engine missing resources if character has W-Engine
  const missingWEngineExp = character.hasWEngine
    ? calculateMissingWEngineExp(resources.wEngineExpMaterials || { basic: 0, advanced: 0, expert: 0 }, requirements.wEngineExp, 1)
    : 0;

  const missingWEngineAscension = character.hasWEngine
    ? calculateMissingWEngineAscension(
        (resources.wEngineAscensionMaterials && resources.wEngineAscensionMaterials[character.class]) || { basic: 0, advanced: 0, expert: 0 },
        requirements.wEngineAscension,
        1
      )
    : { basic: 0, advanced: 0, expert: 0 };

  return {
    ...shared,
    seals: missingSeals,
    chips: missingChips,
    wEngineExp: missingWEngineExp,
    wEngineAscension: missingWEngineAscension,
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
  selectedCharacters: Character[],
  characterSkillLevels?: Record<string, SkillLevels>
): ProgressData => {
  const selectedCharacterCount = selectedCharacters.length;
  
  const exp = calculateExpProgress(resources.investigatorLogs, requirements.totalExp, selectedCharacterCount);
  
  const characterSeals = resources.seals[character.class] || { basic: 0, advanced: 0, topTier: 0 };
  const charactersWithSameClass = selectedCharacters.filter(c => c.class === character.class).length;
  const seals = calculateSealsProgress(characterSeals, requirements.seals, charactersWithSameClass);
  
  const characterChips = resources.chips[character.element] || { basic: 0, advanced: 0, specialized: 0 };
  const charactersWithSameElement = selectedCharacters.filter(c => c.element === character.element).length;
  
  // Collect skill levels for characters with the same element
  const elementSkillLevels = characterSkillLevels
    ? selectedCharacters
        .filter(c => c.element === character.element)
        .map(c => characterSkillLevels[c.id] || { basicAttack: 1, dodge: 1, assist: 1, specialAttack: 1, chainAttack: 1 })
    : undefined;
  
  const chips = calculateChipsProgress(characterChips, requirements.chips, charactersWithSameElement, elementSkillLevels, requirements.skillLevels);
  
  const dennies = calculateDenniesProgress(resources.dennies, requirements.totalDennies, selectedCharacterCount);
  
  const expertChallenge = calculateExpertChallengeProgress(resources.expertChallengeMaterials, requirements.expertChallengeMaterials, selectedCharacterCount);
  const bossMaterials = calculateBossMaterialsProgress(resources.bossMaterials, requirements.bossMaterials, selectedCharacterCount);
  
  // Collect skill levels for all selected characters
  const allSkillLevels = characterSkillLevels
    ? selectedCharacters.map(c => characterSkillLevels[c.id] || { basicAttack: 1, dodge: 1, assist: 1, specialAttack: 1, chainAttack: 1 })
    : undefined;
  
  const hamsterCagePass = calculateHamsterCagePassProgress(resources.hamsterCagePass ?? 0, requirements.hamsterCagePass, selectedCharacterCount, allSkillLevels, requirements.skillLevels);
  
  // W-Engine progress (only if character has W-Engine)
  const wEngineExp = character.hasWEngine
    ? calculateWEngineExpProgress(resources.wEngineExpMaterials || { basic: 0, advanced: 0, expert: 0 }, requirements.wEngineExp, 1)
    : 100;
  
  const wEngineAscension = character.hasWEngine
    ? calculateWEngineAscensionProgress(
        (resources.wEngineAscensionMaterials && resources.wEngineAscensionMaterials[character.class]) || { basic: 0, advanced: 0, expert: 0 },
        requirements.wEngineAscension,
        1
      )
    : 100;
  
  const total = (exp + seals + chips + dennies + expertChallenge + bossMaterials + hamsterCagePass + wEngineExp + wEngineAscension) / 9;
  
  const missing = calculateMissingResources(character, resources, requirements, selectedCharacterCount, charactersWithSameClass, charactersWithSameElement, characterSkillLevels?.[character.id]);
  
  return {
    exp,
    seals,
    chips,
    dennies,
    expertChallenge,
    bossMaterials,
    hamsterCagePass,
    wEngineExp,
    wEngineAscension,
    total,
    missing,
  };
};
