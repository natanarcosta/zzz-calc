// Mapping of material names to their icon paths
// Images are served from public/ folder for Vercel deployment
const hamsterCagePassIcon = '/assets/images/materials/hamster_cage_pass.png';

// W-Engine EXP Materials - using .webp
const wEngineExpBasicIcon = '/assets/images/materials/basic_w_engine_exp.webp';
const wEngineExpAdvancedIcon = '/assets/images/materials/advanced_w_engine_exp.webp';
const wEngineExpExpertIcon = '/assets/images/materials/expert_w_engine_exp.webp';

// Investigator Logs - using .webp
const traineeLogIcon = '/assets/images/materials/trainee_investigator_logs.webp';
const officialLogIcon = '/assets/images/materials/official_investigator_logs.webp';
const seniorLogIcon = '/assets/images/materials/senior_investigator_logs.webp';

// Dennies - using .webp
const dennyIcon = '/assets/images/materials/denny.webp';

// W-Engine Ascension Materials (by class)
const anomalyBasicIcon = '/assets/images/materials/anomaly_component.png';
const anomalyAdvancedIcon = '/assets/images/materials/reinforced_anomaly_component.png';
const anomalyExpertIcon = '/assets/images/materials/specialized_anomaly_component.png';

const attackBasicIcon = '/assets/images/materials/attack_component.png';
const attackAdvancedIcon = '/assets/images/materials/reinforced_attack_component.png';
const attackExpertIcon = '/assets/images/materials/specialized_attack_component.png';

const defenseBasicIcon = '/assets/images/materials/defense_component.png';
const defenseAdvancedIcon = '/assets/images/materials/reinforced_defense_component.png';
const defenseExpertIcon = '/assets/images/materials/specialized_defense_component.png';

const stunBasicIcon = '/assets/images/materials/stun_component.png';
const stunAdvancedIcon = '/assets/images/materials/reinforced_stun_component.png';
const stunExpertIcon = '/assets/images/materials/specialized_stun_component.png';

const supportBasicIcon = '/assets/images/materials/support_component.png';
const supportAdvancedIcon = '/assets/images/materials/reinforced_support_component.png';
const supportExpertIcon = '/assets/images/materials/specialized_support_component.png';

const ruptureBasicIcon = '/assets/images/materials/rupture_component.png';
const ruptureAdvancedIcon = '/assets/images/materials/reinforced_rupture_component.png';
const ruptureExpertIcon = '/assets/images/materials/specialized_rupture_component.png';

const armorerBasicIcon = '/assets/images/materials/armorer_component.png';
const armorerAdvancedIcon = '/assets/images/materials/reinforced_armorer_component.png';
const armorerExpertIcon = '/assets/images/materials/specialized_armorer_component.png';

// Generic class and element icons - using direct URLs for .webp files
const classAnomalyIcon = '/assets/images/class_elements/class_anomaly.webp';
const classArmorerIcon = '/assets/images/class_elements/class_armorer.webp';
const classAttackIcon = '/assets/images/class_elements/class_attack.webp';
const classDefenseIcon = '/assets/images/class_elements/class_defense.webp';
const classRuptureIcon = '/assets/images/class_elements/class_rupture.webp';
const classStunIcon = '/assets/images/class_elements/class_stun.webp';
const classSupportIcon = '/assets/images/class_elements/class_support.webp';

const elementEtherIcon = '/assets/images/class_elements/element_ether.webp';
const elementFireIcon = '/assets/images/class_elements/element_fire.webp';
const elementIceIcon = '/assets/images/class_elements/element_ice.webp';
const elementLumifluxIcon = '/assets/images/class_elements/element_lumiflux.webp';
const elementPhysicalIcon = '/assets/images/class_elements/element_physical.webp';
const elementShockIcon = '/assets/images/class_elements/element_shock.webp';
const elementWindIcon = '/assets/images/class_elements/element_wind.webp';

// Character portraits - dynamic helper function
export const getCharacterPortrait = (characterId: string): string => {
  return `/assets/images/char_portrait/${characterId}.png`;
};

// Seals (by class)
const anomalySealBasicIcon = '/assets/images/materials/basic_anomaly_certification_seal.png';
const anomalySealAdvancedIcon = '/assets/images/materials/advanced_anomaly_certification_seal.png';
const anomalySealTopTierIcon = '/assets/images/materials/arbiter_certification_seal.png';

const attackSealBasicIcon = '/assets/images/materials/basic_attack_certification_seal.png';
const attackSealAdvancedIcon = '/assets/images/materials/advanced_attack_certification_seal.png';
const attackSealTopTierIcon = '/assets/images/materials/bladebearer_certification_seal.png';

const defenseSealBasicIcon = '/assets/images/materials/basic_defense_certification_seal.png';
const defenseSealAdvancedIcon = '/assets/images/materials/advanced_defense_certification_seal.png';
const defenseSealTopTierIcon = '/assets/images/materials/defender_certification_seal.png';

const stunSealBasicIcon = '/assets/images/materials/basic_stun_certification_seal.png';
const stunSealAdvancedIcon = '/assets/images/materials/advanced_stun_certification_seal.png';
const stunSealTopTierIcon = '/assets/images/materials/ruler_certification_seal.png';

const supportSealBasicIcon = '/assets/images/materials/basic_support_certification_seal.png';
const supportSealAdvancedIcon = '/assets/images/materials/advanced_support_certification_seal.png';
const supportSealTopTierIcon = '/assets/images/materials/controller_certification_seal.png';

const ruptureSealBasicIcon = '/assets/images/materials/basic_rupture_certification_seal.png';
const ruptureSealAdvancedIcon = '/assets/images/materials/advanced_rupture_certification_seal.png';
const ruptureSealTopTierIcon = '/assets/images/materials/arbiter_certification_seal.png';

const armorerSealBasicIcon = '/assets/images/materials/basic_armorer_certification_seal.png';
const armorerSealAdvancedIcon = '/assets/images/materials/advanced_armorer_certification_seal.png';
const armorerSealTopTierIcon = '/assets/images/materials/buster_certification_seal.png';

// Chips (by element)
const burnChipBasicIcon = '/assets/images/materials/basic_burn_chip.png';
const burnChipAdvancedIcon = '/assets/images/materials/advanced_burn_chip.png';
const burnChipSpecializedIcon = '/assets/images/materials/specialized_burn_chip.png';

const etherChipBasicIcon = '/assets/images/materials/basic_ether_chip.png';
const etherChipAdvancedIcon = '/assets/images/materials/advanced_ether_chip.png';
const etherChipSpecializedIcon = '/assets/images/materials/specialized_ether_chip.png';

const freezeChipBasicIcon = '/assets/images/materials/basic_freeze_chip.png';
const freezeChipAdvancedIcon = '/assets/images/materials/advanced_freeze_chip.png';
const freezeChipSpecializedIcon = '/assets/images/materials/specialized_freeze_chip.png';

const lumifluxChipBasicIcon = '/assets/images/materials/basic_lumiflux_chip.png';
const lumifluxChipAdvancedIcon = '/assets/images/materials/advanced_lumiflux_chip.png';
const lumifluxChipSpecializedIcon = '/assets/images/materials/specialized_lumiflux_chip.png';

const physicalChipBasicIcon = '/assets/images/materials/basic_physical_chip.png';
const physicalChipAdvancedIcon = '/assets/images/materials/advanced_physical_chip.png';
const physicalChipSpecializedIcon = '/assets/images/materials/specialized_physical_chip.png';

const shockChipBasicIcon = '/assets/images/materials/basic_shock_chip.png';
const shockChipAdvancedIcon = '/assets/images/materials/advanced_shock_chip.png';
const shockChipSpecializedIcon = '/assets/images/materials/specialized_shock_chip.png';

const windbiteChipBasicIcon = '/assets/images/materials/basic_windbite_chip.png';
const windbiteChipAdvancedIcon = '/assets/images/materials/advanced_windbite_chip.png';
const windbiteChipSpecializedIcon = '/assets/images/materials/specialized_windbite_chip.png';

export const MATERIAL_ICONS = {
  // Generic class icons
  classes: {
    Anomaly: classAnomalyIcon,
    Armorer: classArmorerIcon,
    Attack: classAttackIcon,
    Defense: classDefenseIcon,
    Rupture: classRuptureIcon,
    Stun: classStunIcon,
    Support: classSupportIcon,
  },

  // Generic element icons
  elements: {
    Ether: elementEtherIcon,
    Fire: elementFireIcon,
    Ice: elementIceIcon,
    Lumiflux: elementLumifluxIcon,
    Physical: elementPhysicalIcon,
    Electric: elementShockIcon,
    Wind: elementWindIcon,
  },

  // Dennies
  denny: dennyIcon,

  // Investigator Logs
  investigatorLogs: {
    trainee: traineeLogIcon,
    official: officialLogIcon,
    senior: seniorLogIcon,
  },

  // Hamster Cage Pass
  hamsterCagePass: hamsterCagePassIcon,

  // W-Engine EXP Materials
  wEngineExp: {
    basic: wEngineExpBasicIcon,
    advanced: wEngineExpAdvancedIcon,
    expert: wEngineExpExpertIcon,
  },

  // W-Engine Ascension Materials (by class)
  wEngineAscension: {
    Anomaly: {
      basic: anomalyBasicIcon,
      advanced: anomalyAdvancedIcon,
      expert: anomalyExpertIcon,
    },
    Attack: {
      basic: attackBasicIcon,
      advanced: attackAdvancedIcon,
      expert: attackExpertIcon,
    },
    Defense: {
      basic: defenseBasicIcon,
      advanced: defenseAdvancedIcon,
      expert: defenseExpertIcon,
    },
    Stun: {
      basic: stunBasicIcon,
      advanced: stunAdvancedIcon,
      expert: stunExpertIcon,
    },
    Support: {
      basic: supportBasicIcon,
      advanced: supportAdvancedIcon,
      expert: supportExpertIcon,
    },
    Rupture: {
      basic: ruptureBasicIcon,
      advanced: ruptureAdvancedIcon,
      expert: ruptureExpertIcon,
    },
    Armorer: {
      basic: armorerBasicIcon,
      advanced: armorerAdvancedIcon,
      expert: armorerExpertIcon,
    },
  },

  // Seals (by class)
  seals: {
    Anomaly: {
      basic: anomalySealBasicIcon,
      advanced: anomalySealAdvancedIcon,
      topTier: anomalySealTopTierIcon,
    },
    Attack: {
      basic: attackSealBasicIcon,
      advanced: attackSealAdvancedIcon,
      topTier: attackSealTopTierIcon,
    },
    Defense: {
      basic: defenseSealBasicIcon,
      advanced: defenseSealAdvancedIcon,
      topTier: defenseSealTopTierIcon,
    },
    Stun: {
      basic: stunSealBasicIcon,
      advanced: stunSealAdvancedIcon,
      topTier: stunSealTopTierIcon,
    },
    Support: {
      basic: supportSealBasicIcon,
      advanced: supportSealAdvancedIcon,
      topTier: supportSealTopTierIcon,
    },
    Rupture: {
      basic: ruptureSealBasicIcon,
      advanced: ruptureSealAdvancedIcon,
      topTier: ruptureSealTopTierIcon,
    },
    Armorer: {
      basic: armorerSealBasicIcon,
      advanced: armorerSealAdvancedIcon,
      topTier: armorerSealTopTierIcon,
    },
  },

  // Chips (by element) - using game-data.json element names
  chips: {
    Fire: {
      basic: burnChipBasicIcon,
      advanced: burnChipAdvancedIcon,
      specialized: burnChipSpecializedIcon,
    },
    Ice: {
      basic: freezeChipBasicIcon,
      advanced: freezeChipAdvancedIcon,
      specialized: freezeChipSpecializedIcon,
    },
    Electric: {
      basic: shockChipBasicIcon,
      advanced: shockChipAdvancedIcon,
      specialized: shockChipSpecializedIcon,
    },
    Wind: {
      basic: windbiteChipBasicIcon,
      advanced: windbiteChipAdvancedIcon,
      specialized: windbiteChipSpecializedIcon,
    },
    Ether: {
      basic: etherChipBasicIcon,
      advanced: etherChipAdvancedIcon,
      specialized: etherChipSpecializedIcon,
    },
    Lumiflux: {
      basic: lumifluxChipBasicIcon,
      advanced: lumifluxChipAdvancedIcon,
      specialized: lumifluxChipSpecializedIcon,
    },
    Physical: {
      basic: physicalChipBasicIcon,
      advanced: physicalChipAdvancedIcon,
      specialized: physicalChipSpecializedIcon,
    },
  },
} as const;

export type MaterialIconPath = typeof MATERIAL_ICONS;

export const getClassIcon = (className: string): string | undefined => {
  return (MATERIAL_ICONS.classes as Record<string, string>)[className];
};

export const getElementIcon = (element: string): string | undefined => {
  return (MATERIAL_ICONS.elements as Record<string, string>)[element];
};

export const getSealIcons = (className: string): { basic: string; advanced: string; topTier: string } | undefined => {
  return (MATERIAL_ICONS.seals as Record<string, { basic: string; advanced: string; topTier: string }>)[className];
};

export const getChipIcons = (element: string): { basic: string; advanced: string; specialized: string } | undefined => {
  return (MATERIAL_ICONS.chips as Record<string, { basic: string; advanced: string; specialized: string }>)[element];
};

export const getWEngineAscensionIcons = (className: string): { basic: string; advanced: string; expert: string } | undefined => {
  return (MATERIAL_ICONS.wEngineAscension as Record<string, { basic: string; advanced: string; expert: string }>)[className];
};

