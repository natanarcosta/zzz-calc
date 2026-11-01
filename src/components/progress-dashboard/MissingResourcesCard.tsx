import type { MissingResources } from '../../types';
import {
  MATERIAL_ICONS,
  getClassIcon,
  getElementIcon,
  getSealIcons,
  getChipIcons,
} from '../../lib/materialIcons';
import { MaterialIcon } from '../MaterialIcon';
import { Badge } from '../ui/Badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface MissingResourcesCardProps {
  missingResources: MissingResources & {
    sealsByClass?: Record<string, { basic: number; advanced: number; topTier: number }>;
    chipsByElement?: Record<string, { basic: number; advanced: number; specialized: number }>;
  };
}

export const MissingResourcesCard = ({ missingResources }: MissingResourcesCardProps) => {
  const hasMissing =
    missingResources.exp > 0 ||
    missingResources.dennies > 0 ||
    missingResources.expertChallenge > 0 ||
    missingResources.bossMaterials > 0 ||
    missingResources.hamsterCagePass > 0 ||
    missingResources.wEngineExp > 0 ||
    missingResources.seals.basic > 0 ||
    missingResources.seals.advanced > 0 ||
    missingResources.seals.topTier > 0 ||
    missingResources.chips.basic > 0 ||
    missingResources.chips.advanced > 0 ||
    missingResources.chips.specialized > 0 ||
    missingResources.wEngineAscension.basic > 0 ||
    missingResources.wEngineAscension.advanced > 0 ||
    missingResources.wEngineAscension.expert > 0;

  if (!hasMissing) {
    return (
      <div className="p-6 bg-zzz-surface rounded-sm border border-zzz-success/40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-zzz-success/5 pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-zzz-success/15 text-zzz-success mx-auto flex items-center justify-center mb-3">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-zzz-success font-bold mb-1">
          // DEPLOYMENT_READY
        </div>
        <h3 className="font-display text-xl font-bold text-white uppercase">
          All Target Resources Collected!
        </h3>
        <p className="text-sm text-zzz-text-secondary max-w-md mx-auto mt-1">
          Your inventory meets 100% of the promotion and skill progression requirements for the selected agents.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zzz-surface rounded-sm border border-zzz-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zzz-border-subtle bg-black/25 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-sm bg-zzz-danger/15 text-zzz-danger">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zzz-danger uppercase tracking-widest font-semibold">
              // REQUISITION_DEFICIT
            </div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
              Outstanding Material Shortages
            </h3>
          </div>
        </div>
        <Badge variant="danger" size="xs" dot>
          DEFICIT DETECTED
        </Badge>
      </div>

      <div className="p-4 space-y-5">
        {/* Universal Currencies & EXP */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-zzz-text-muted font-bold flex items-center gap-1.5">
            <span className="w-1 h-1 bg-zzz-accent rounded-full" />
            General & Currency Requisitions
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* Dennies */}
            {missingResources.dennies > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <MaterialIcon src={MATERIAL_ICONS.denny} alt="Dennies" size="sm" />
                  <span className="text-xs font-medium text-zzz-text truncate">Dennies</span>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.dennies.toLocaleString()}
                </span>
              </div>
            )}

            {/* EXP Logs */}
            {missingResources.exp > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <MaterialIcon
                    src={MATERIAL_ICONS.investigatorLogs.senior}
                    alt="Senior Investigator Log"
                    size="sm"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-zzz-text block truncate">Agent EXP</span>
                    <span className="text-[10px] text-zzz-text-muted block truncate">
                      ≈ {Math.ceil(missingResources.exp / 3000)} Senior Logs
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.exp.toLocaleString()}
                </span>
              </div>
            )}

            {/* Expert Challenge */}
            {missingResources.expertChallenge > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded bg-zzz-accent/15 text-zzz-accent font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    EC
                  </div>
                  <span className="text-xs font-medium text-zzz-text truncate">
                    Expert Materials
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.expertChallenge}
                </span>
              </div>
            )}

            {/* Boss Materials */}
            {missingResources.bossMaterials > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded bg-zzz-secondary/15 text-zzz-secondary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    BM
                  </div>
                  <span className="text-xs font-medium text-zzz-text truncate">Boss Materials</span>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.bossMaterials}
                </span>
              </div>
            )}

            {/* Hamster Cage Pass */}
            {missingResources.hamsterCagePass > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <MaterialIcon
                    src={MATERIAL_ICONS.hamsterCagePass}
                    alt="Hamster Cage Pass"
                    size="sm"
                  />
                  <span className="text-xs font-medium text-zzz-text truncate">
                    Hamster Cage Pass
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.hamsterCagePass}
                </span>
              </div>
            )}

            {/* W-Engine EXP */}
            {missingResources.wEngineExp > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle">
                <div className="flex items-center gap-2 min-w-0">
                  <MaterialIcon
                    src={MATERIAL_ICONS.wEngineExp.expert}
                    alt="W-Engine EXP"
                    size="sm"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-zzz-text block truncate">
                      W-Engine EXP
                    </span>
                    <span className="text-[10px] text-zzz-text-muted block truncate">
                      ≈ {Math.ceil(missingResources.wEngineExp / 3000)} Power Supplies
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-zzz-danger tabular-nums shrink-0">
                  -{missingResources.wEngineExp.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Certification Seals by Class */}
        {(missingResources.seals.basic > 0 ||
          missingResources.seals.advanced > 0 ||
          missingResources.seals.topTier > 0) && (
          <div className="space-y-2.5 pt-2 border-t border-zzz-border-subtle">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zzz-text-muted font-bold flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zzz-accent rounded-full" />
              Certification Seals Needed
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {missingResources.sealsByClass &&
                Object.entries(missingResources.sealsByClass).map(([className, seals]) => {
                  if (seals.basic <= 0 && seals.advanced <= 0 && seals.topTier <= 0) return null;
                  const icons = getSealIcons(className);
                  const classIcon = getClassIcon(className);

                  return (
                    <div
                      key={className}
                      className="p-3 bg-black/30 rounded-sm border border-zzz-border-subtle flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white font-display uppercase">
                          {classIcon && <MaterialIcon src={classIcon} alt={className} size="xs" />}
                          {className}
                        </span>
                        <Badge variant="outline" size="xs">
                          Class Seals
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.basic && (
                            <MaterialIcon src={icons.basic} alt="Basic" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Basic</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {seals.basic > 0 ? `-${seals.basic}` : 'OK'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.advanced && (
                            <MaterialIcon src={icons.advanced} alt="Advanced" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Adv</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {seals.advanced > 0 ? `-${seals.advanced}` : 'OK'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.topTier && (
                            <MaterialIcon src={icons.topTier} alt="Top-Tier" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Top</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {seals.topTier > 0 ? `-${seals.topTier}` : 'OK'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Tactical Chips by Element */}
        {(missingResources.chips.basic > 0 ||
          missingResources.chips.advanced > 0 ||
          missingResources.chips.specialized > 0) && (
          <div className="space-y-2.5 pt-2 border-t border-zzz-border-subtle">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zzz-text-muted font-bold flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zzz-accent rounded-full" />
              Elemental Skill Chips Needed
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {missingResources.chipsByElement &&
                Object.entries(missingResources.chipsByElement).map(([element, chips]) => {
                  if (chips.basic <= 0 && chips.advanced <= 0 && chips.specialized <= 0) return null;
                  const icons = getChipIcons(element);
                  const elementIcon = getElementIcon(element);

                  return (
                    <div
                      key={element}
                      className="p-3 bg-black/30 rounded-sm border border-zzz-border-subtle flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white font-display uppercase">
                          {elementIcon && <MaterialIcon src={elementIcon} alt={element} size="xs" />}
                          {element}
                        </span>
                        <Badge variant="outline" size="xs">
                          Element Chips
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.basic && (
                            <MaterialIcon src={icons.basic} alt="Basic" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Basic</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {chips.basic > 0 ? `-${chips.basic}` : 'OK'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.advanced && (
                            <MaterialIcon src={icons.advanced} alt="Advanced" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Adv</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {chips.advanced > 0 ? `-${chips.advanced}` : 'OK'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-sm">
                          {icons?.specialized && (
                            <MaterialIcon src={icons.specialized} alt="Specialized" size="xs" />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] text-zzz-text-muted block">Spec</span>
                            <span className="font-bold text-zzz-danger tabular-nums">
                              {chips.specialized > 0 ? `-${chips.specialized}` : 'OK'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* W-Engine Ascension Materials */}
        {(missingResources.wEngineAscension.basic > 0 ||
          missingResources.wEngineAscension.advanced > 0 ||
          missingResources.wEngineAscension.expert > 0) && (
          <div className="space-y-2.5 pt-2 border-t border-zzz-border-subtle">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zzz-text-muted font-bold flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zzz-accent rounded-full" />
              W-Engine Modification Materials
            </h4>

            <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle text-center">
                <span className="text-zzz-text-muted block text-[11px] uppercase">Basic Comp.</span>
                <span className="text-sm font-bold text-zzz-danger tabular-nums">
                  -{missingResources.wEngineAscension.basic}
                </span>
              </div>
              <div className="p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle text-center">
                <span className="text-zzz-text-muted block text-[11px] uppercase">Adv Comp.</span>
                <span className="text-sm font-bold text-zzz-danger tabular-nums">
                  -{missingResources.wEngineAscension.advanced}
                </span>
              </div>
              <div className="p-2.5 bg-black/30 rounded-sm border border-zzz-border-subtle text-center">
                <span className="text-zzz-text-muted block text-[11px] uppercase">Spec Comp.</span>
                <span className="text-sm font-bold text-zzz-danger tabular-nums">
                  -{missingResources.wEngineAscension.expert}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
