import type { Character, ProgressData, SkillLevels } from '../../types';
import { getCharacterPortrait, getClassIcon, getElementIcon } from '../../lib/materialIcons';
import { MaterialIcon } from '../MaterialIcon';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { Shield, Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCharacters } from '../../hooks/useCharacters';
import { useState } from 'react';

interface CharacterProgressCardProps {
  character: Character;
  progress: ProgressData;
  onRemove?: () => void;
  onToggleWEngine?: () => void;
}

export const CharacterProgressCard = ({
  character,
  progress,
  onRemove,
  onToggleWEngine,
}: CharacterProgressCardProps) => {
  const classIcon = getClassIcon(character.class);
  const elementIcon = getElementIcon(character.element);
  const isComplete = progress.total >= 100;
  const { getSkillLevels, updateSkillLevel } = useCharacters();
  const [showSkillLevels, setShowSkillLevels] = useState(false);
  
  const skillLevels = getSkillLevels(character.id);
  
  const skillIcons: Record<keyof SkillLevels, string> = {
    basicAttack: '/assets/images/skills/basic_attack.webp',
    dodge: '/assets/images/skills/dodge.webp',
    assist: '/assets/images/skills/assist.webp',
    specialAttack: '/assets/images/skills/special_attack.webp',
    chainAttack: '/assets/images/skills/chain_attack.webp',
  };
  
  const skillLabels: Record<keyof SkillLevels, string> = {
    basicAttack: 'Basic Attack',
    dodge: 'Dodge',
    assist: 'Assist',
    specialAttack: 'Special Attack',
    chainAttack: 'Chain Attack',
  };
  
  const handleSkillLevelChange = (skill: keyof SkillLevels, level: number) => {
    updateSkillLevel(character.id, skill, level);
  };

  return (
    <div className="bg-zzz-surface rounded-sm border border-zzz-border hover:border-zzz-border-strong transition-all duration-200 relative overflow-hidden flex flex-col group">
      {/* Top Graphic Accent */}
      <div
        className={`h-1 w-full ${
          isComplete ? 'bg-zzz-success' : progress.total >= 50 ? 'bg-zzz-secondary' : 'bg-zzz-accent'
        }`}
      />

      {/* Card Header with Portrait */}
      <div className="p-3.5 sm:p-4 pb-3 border-b border-zzz-border-subtle bg-black/20 flex items-start gap-3">
        {/* Agent Portrait Thumbnail */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-sm overflow-hidden bg-zzz-surface-sunken border border-zzz-border-subtle shrink-0">
          <MaterialIcon
            src={getCharacterPortrait(character.id)}
            alt={character.name}
            className="w-full h-full object-cover object-top"
          />
          {/* Element Mini-Badge in Corner */}
          {elementIcon && (
            <div className="absolute bottom-0 right-0 p-0.5 bg-black/80 rounded-tl-sm border-t border-l border-white/10">
              <MaterialIcon src={elementIcon} alt={character.element} size="xs" />
            </div>
          )}
        </div>

        {/* Agent Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase truncate">
              {character.name}
            </h3>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                title={`Remove ${character.name}`}
                className="text-zzz-text-muted hover:text-zzz-danger p-1 rounded-sm zzz-focus-ring transition-colors shrink-0"
                aria-label={`Remove ${character.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-zzz-text-secondary">
              {classIcon && <MaterialIcon src={classIcon} alt={character.class} size="xs" />}
              {character.class}
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-zzz-text-secondary">
              {elementIcon && <MaterialIcon src={elementIcon} alt={character.element} size="xs" />}
              {character.element}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars List */}
      <div className="p-3.5 sm:p-4 space-y-2.5 flex-1">
        <div className="space-y-2 text-xs">
          <ProgressBar label="EXP (Logs)" value={progress.exp} size="sm" />
          <ProgressBar label="Dennies" value={progress.dennies} size="sm" />
          <ProgressBar label={`${character.class} Seals`} value={progress.seals} size="sm" />
          <ProgressBar label={`${character.element} Chips`} value={progress.chips} size="sm" />
          <ProgressBar 
            label={progress.expertChallengeMaterialName ? `Expert: ${progress.expertChallengeMaterialName.replace('Higher Dimensional Data: ', '')}` : 'Expert Challenge'} 
            value={progress.expertChallenge} 
            size="sm" 
          />
          <ProgressBar 
            label={progress.bossMaterialName ? `Boss: ${progress.bossMaterialName}` : 'Boss Materials'} 
            value={progress.bossMaterials} 
            size="sm" 
          />
          <ProgressBar label="Hamster Cage Pass" value={progress.hamsterCagePass} size="sm" />

          {character.hasWEngine && (
            <div className="pt-2 mt-2 border-t border-zzz-border-subtle space-y-2">
              <div className="flex items-center gap-1 text-[11px] font-mono text-zzz-secondary font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-zzz-secondary" />
                <span>W-Engine Progression</span>
              </div>
              <ProgressBar label="W-Engine EXP" value={progress.wEngineExp} size="sm" />
              <ProgressBar label="W-Engine Ascension" value={progress.wEngineAscension} size="sm" />
            </div>
          )}
        </div>
      </div>

      {/* Skill Levels Section */}
      <div className="border-t border-zzz-border-subtle">
        <button
          type="button"
          onClick={() => setShowSkillLevels(!showSkillLevels)}
          className="w-full px-3.5 py-2 flex items-center justify-between gap-2 text-xs font-mono text-zzz-text-secondary hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold uppercase tracking-wider">Skill Levels</span>
          {showSkillLevels ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showSkillLevels && (
          <div className="px-3.5 pb-3.5 space-y-2">
            {(Object.keys(skillLevels) as Array<keyof SkillLevels>).map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <MaterialIcon 
                  src={skillIcons[skill]} 
                  alt={skillLabels[skill]} 
                  size="xs"
                  className="w-6 h-6 shrink-0"
                />
                <span className="text-[11px] text-zzz-text-secondary min-w-[80px]">{skillLabels[skill]}</span>
                <select
                  value={skillLevels[skill]}
                  onChange={(e) => handleSkillLevelChange(skill, parseInt(e.target.value, 10))}
                  className="flex-1 bg-black/40 border border-zzz-border-subtle rounded-sm px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-zzz-accent transition-colors"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      Lv. {level}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer: W-Engine Toggle & Total Readiness */}
      <div className="p-3 sm:p-3.5 bg-black/40 border-t border-zzz-border-subtle mt-auto space-y-2.5">
        {/* W-Engine quick toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onToggleWEngine}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-colors border ${
              character.hasWEngine
                ? 'bg-zzz-secondary/15 text-zzz-secondary border-zzz-secondary/40'
                : 'bg-white/5 text-zzz-text-muted hover:text-white border-transparent'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{character.hasWEngine ? 'W-Engine Active' : 'Include W-Engine'}</span>
          </button>

          <Badge
            variant={isComplete ? 'success' : progress.total >= 50 ? 'secondary' : 'danger'}
            size="xs"
            dot
          >
            {isComplete ? 'READY' : 'INCOMPLETE'}
          </Badge>
        </div>

        {/* Total Overall Bar */}
        <div>
          <div className="flex justify-between items-baseline text-xs mb-1">
            <span className="font-mono text-zzz-text-secondary uppercase tracking-wider font-semibold">
              Total Readiness
            </span>
            <span
              className={`font-mono font-bold text-sm tabular-nums ${
                isComplete ? 'text-zzz-success' : progress.total >= 50 ? 'text-zzz-secondary' : 'text-zzz-danger'
              }`}
            >
              {progress.total.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-black/60 rounded-sm h-2.5 border border-zzz-border-subtle overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-sm transition-all duration-300 ${
                isComplete ? 'bg-zzz-success' : progress.total >= 50 ? 'bg-zzz-secondary' : 'bg-zzz-accent'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progress.total))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
