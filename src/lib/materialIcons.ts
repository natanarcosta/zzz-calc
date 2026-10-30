// Mapping of material names to their icon paths
// Images are imported to work with Vite
import hamsterCagePassIcon from '../assets/images/materials/hamster_cage_pass.png';

// W-Engine EXP Materials - using .webp
import wEngineExpBasicIcon from '../assets/images/materials/basic_w_engine_exp.webp';
import wEngineExpAdvancedIcon from '../assets/images/materials/advanced_w_engine_exp.webp';
import wEngineExpExpertIcon from '../assets/images/materials/expert_w_engine_exp.webp';

// Investigator Logs - using .webp
import traineeLogIcon from '../assets/images/materials/trainee_investigator_logs.webp';
import officialLogIcon from '../assets/images/materials/official_investigator_logs.webp';
import seniorLogIcon from '../assets/images/materials/senior_investigator_logs.webp';

// Dennies - using .webp
import dennyIcon from '../assets/images/materials/denny.webp';

// W-Engine Ascension Materials (by class)
import anomalyBasicIcon from '../assets/images/materials/anomaly_component.png';
import anomalyAdvancedIcon from '../assets/images/materials/reinforced_anomaly_component.png';
import anomalyExpertIcon from '../assets/images/materials/specialized_anomaly_component.png';

import attackBasicIcon from '../assets/images/materials/attack_component.png';
import attackAdvancedIcon from '../assets/images/materials/reinforced_attack_component.png';
import attackExpertIcon from '../assets/images/materials/specialized_attack_component.png';

import defenseBasicIcon from '../assets/images/materials/defense_component.png';
import defenseAdvancedIcon from '../assets/images/materials/reinforced_defense_component.png';
import defenseExpertIcon from '../assets/images/materials/specialized_defense_component.png';

import stunBasicIcon from '../assets/images/materials/stun_component.png';
import stunAdvancedIcon from '../assets/images/materials/reinforced_stun_component.png';
import stunExpertIcon from '../assets/images/materials/specialized_stun_component.png';

import supportBasicIcon from '../assets/images/materials/support_component.png';
import supportAdvancedIcon from '../assets/images/materials/reinforced_support_component.png';
import supportExpertIcon from '../assets/images/materials/specialized_support_component.png';

import ruptureBasicIcon from '../assets/images/materials/rupture_component.png';
import ruptureAdvancedIcon from '../assets/images/materials/reinforced_rupture_component.png';
import ruptureExpertIcon from '../assets/images/materials/specialized_rupture_component.png';

import armorerBasicIcon from '../assets/images/materials/armorer_component.png';
import armorerAdvancedIcon from '../assets/images/materials/reinforced_armorer_component.png';
import armorerExpertIcon from '../assets/images/materials/specialized_armorer_component.png';

// Generic class and element icons - using direct URLs for .webp files
const classAnomalyIcon = '/src/assets/images/class_elements/class_anomaly.webp';
const classArmorerIcon = '/src/assets/images/class_elements/class_armorer.webp';
const classAttackIcon = '/src/assets/images/class_elements/class_attack.webp';
const classDefenseIcon = '/src/assets/images/class_elements/class_defense.webp';
const classRuptureIcon = '/src/assets/images/class_elements/class_rupture.webp';
const classStunIcon = '/src/assets/images/class_elements/class_stun.webp';
const classSupportIcon = '/src/assets/images/class_elements/class_support.webp';

const elementEtherIcon = '/src/assets/images/class_elements/element_ether.webp';
const elementFireIcon = '/src/assets/images/class_elements/element_fire.webp';
const elementIceIcon = '/src/assets/images/class_elements/element_ice.webp';
const elementLumifluxIcon = '/src/assets/images/class_elements/element_lumiflux.webp';
const elementPhysicalIcon = '/src/assets/images/class_elements/element_physical.webp';
const elementShockIcon = '/src/assets/images/class_elements/element_shock.webp';
const elementWindIcon = '/src/assets/images/class_elements/element_wind.webp';

// Character portraits - dynamic helper function
export const getCharacterPortrait = (characterId: string): string => {
  return `/src/assets/images/char_portrait/${characterId}.png`;
};

// Seals (by class)
import anomalySealBasicIcon from '../assets/images/materials/basic_anomaly_certification_seal.png';
import anomalySealAdvancedIcon from '../assets/images/materials/advanced_anomaly_certification_seal.png';
import anomalySealTopTierIcon from '../assets/images/materials/arbiter_certification_seal.png';

import attackSealBasicIcon from '../assets/images/materials/basic_attack_certification_seal.png';
import attackSealAdvancedIcon from '../assets/images/materials/advanced_attack_certification_seal.png';
import attackSealTopTierIcon from '../assets/images/materials/bladebearer_certification_seal.png';

import defenseSealBasicIcon from '../assets/images/materials/basic_defense_certification_seal.png';
import defenseSealAdvancedIcon from '../assets/images/materials/advanced_defense_certification_seal.png';
import defenseSealTopTierIcon from '../assets/images/materials/defender_certification_seal.png';

import stunSealBasicIcon from '../assets/images/materials/basic_stun_certification_seal.png';
import stunSealAdvancedIcon from '../assets/images/materials/advanced_stun_certification_seal.png';
import stunSealTopTierIcon from '../assets/images/materials/ruler_certification_seal.png';

import supportSealBasicIcon from '../assets/images/materials/basic_support_certification_seal.png';
import supportSealAdvancedIcon from '../assets/images/materials/advanced_support_certification_seal.png';
import supportSealTopTierIcon from '../assets/images/materials/controller_certification_seal.png';

import ruptureSealBasicIcon from '../assets/images/materials/basic_rupture_certification_seal.png';
import ruptureSealAdvancedIcon from '../assets/images/materials/advanced_rupture_certification_seal.png';
import ruptureSealTopTierIcon from '../assets/images/materials/arbiter_certification_seal.png';

import armorerSealBasicIcon from '../assets/images/materials/basic_armorer_certification_seal.png';
import armorerSealAdvancedIcon from '../assets/images/materials/advanced_armorer_certification_seal.png';
import armorerSealTopTierIcon from '../assets/images/materials/buster_certification_seal.png';

// Chips (by element)
import burnChipBasicIcon from '../assets/images/materials/basic_burn_chip.png';
import burnChipAdvancedIcon from '../assets/images/materials/advanced_burn_chip.png';
import burnChipSpecializedIcon from '../assets/images/materials/specialized_burn_chip.png';

import etherChipBasicIcon from '../assets/images/materials/basic_ether_chip.png';
import etherChipAdvancedIcon from '../assets/images/materials/advanced_ether_chip.png';
import etherChipSpecializedIcon from '../assets/images/materials/specialized_ether_chip.png';

import freezeChipBasicIcon from '../assets/images/materials/basic_freeze_chip.png';
import freezeChipAdvancedIcon from '../assets/images/materials/advanced_freeze_chip.png';
import freezeChipSpecializedIcon from '../assets/images/materials/specialized_freeze_chip.png';

import lumifluxChipBasicIcon from '../assets/images/materials/basic_lumiflux_chip.png';
import lumifluxChipAdvancedIcon from '../assets/images/materials/advanced_lumiflux_chip.png';
import lumifluxChipSpecializedIcon from '../assets/images/materials/specialized_lumiflux_chip.png';

import physicalChipBasicIcon from '../assets/images/materials/basic_physical_chip.png';
import physicalChipAdvancedIcon from '../assets/images/materials/advanced_physical_chip.png';
import physicalChipSpecializedIcon from '../assets/images/materials/specialized_physical_chip.png';

import shockChipBasicIcon from '../assets/images/materials/basic_shock_chip.png';
import shockChipAdvancedIcon from '../assets/images/materials/advanced_shock_chip.png';
import shockChipSpecializedIcon from '../assets/images/materials/specialized_shock_chip.png';

import windbiteChipBasicIcon from '../assets/images/materials/basic_windbite_chip.png';
import windbiteChipAdvancedIcon from '../assets/images/materials/advanced_windbite_chip.png';
import windbiteChipSpecializedIcon from '../assets/images/materials/specialized_windbite_chip.png';

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
