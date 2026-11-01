import { useState } from 'react';
import { useResources } from '../../hooks/useResources';
import gameData from '../../data/game-data.json';
import { MaterialIcon } from '../MaterialIcon';
import {
  MATERIAL_ICONS,
  getClassIcon,
  getElementIcon,
  getSealIcons,
  getChipIcons,
  getWEngineAscensionIcons,
} from '../../lib/materialIcons';
import type { GameData } from '../../types';
import { Badge } from '../ui/Badge';
import { Archive, Coins, ShieldCheck, Zap, Disc3 } from 'lucide-react';

interface ResourceInputProps {
  compact?: boolean;
}

export const ResourceInput = ({ compact = false }: ResourceInputProps) => {
  const {
    resources,
    updateDennies,
    updateInvestigatorLogs,
    updateSeals,
    updateChips,
    updateExpertChallengeMaterials,
    updateBossMaterials,
    updateHamsterCagePass,
    updateWEngineExpMaterials,
    updateWEngineAscensionMaterials,
  } = useResources();

  const data = gameData as GameData;
  const [activeTab, setActiveTab] = useState<'all' | 'currency' | 'seals' | 'chips' | 'wengine'>('all');

  const inputClass =
    'w-full px-2.5 py-1.5 bg-black/50 border border-zzz-border-subtle hover:border-zzz-border focus:border-zzz-accent rounded-sm text-white font-mono text-xs tabular-nums zzz-focus-ring transition-colors';

  const tierInputClass =
    'w-full px-2 py-1 bg-black/60 border border-zzz-border-subtle hover:border-zzz-border focus:border-zzz-accent rounded-sm text-white font-mono text-xs tabular-nums zzz-focus-ring transition-colors text-right';

  return (
    <div className="bg-zzz-surface rounded-sm border border-zzz-border overflow-hidden">
      {/* Header with Category Filter Tabs */}
      <div className="p-3 sm:p-4 border-b border-zzz-border-subtle bg-black/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-sm bg-white/5 text-zzz-accent border border-white/10">
            <Archive className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zzz-accent uppercase tracking-widest font-semibold block">
              // WAREHOUSE_TERMINAL
            </span>
            <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">
              Resource Inventory
            </h2>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider transition-colors ${
              activeTab === 'all'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-secondary hover:text-white'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('currency')}
            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'currency'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-secondary hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>General</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seals')}
            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'seals'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-secondary hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Seals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chips')}
            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'chips'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-secondary hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Chips</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wengine')}
            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'wengine'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-secondary hover:text-white'
            }`}
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>W-Engine</span>
          </button>
        </div>
      </div>

      <div className={compact ? 'p-3 sm:p-4 space-y-4' : 'p-3.5 sm:p-5 space-y-6'}>
        {/* Section 1: Currencies & General */}
        {(activeTab === 'all' || activeTab === 'currency') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zzz-border-subtle pb-2">
              <span className="font-mono text-xs text-zzz-text-secondary uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-zzz-accent" />
                General Supplies & Currency
              </span>
              <Badge variant="outline" size="xs">
                SHARED POOL
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Dennies */}
              <div className="p-2.5 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                  <MaterialIcon src={MATERIAL_ICONS.denny} alt="Dennies" size="xs" />
                  <span className="truncate">Dennies</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={resources.dennies || ''}
                  onChange={(e) => updateDennies(Math.max(0, Number(e.target.value)))}
                  className={inputClass}
                  placeholder="0"
                />
              </div>

              {/* Expert Challenge */}
              <div className="p-2.5 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                  <span className="w-4 h-4 rounded bg-zzz-accent/15 text-zzz-accent font-bold text-[10px] flex items-center justify-center">
                    E
                  </span>
                  <span className="truncate">Expert Materials</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={resources.expertChallengeMaterials || ''}
                  onChange={(e) =>
                    updateExpertChallengeMaterials(Math.max(0, Number(e.target.value)))
                  }
                  className={inputClass}
                  placeholder="0"
                />
              </div>

              {/* Boss Materials */}
              <div className="p-2.5 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                  <span className="w-4 h-4 rounded bg-zzz-secondary/15 text-zzz-secondary font-bold text-[10px] flex items-center justify-center">
                    B
                  </span>
                  <span className="truncate">Boss Materials</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={resources.bossMaterials || ''}
                  onChange={(e) => updateBossMaterials(Math.max(0, Number(e.target.value)))}
                  className={inputClass}
                  placeholder="0"
                />
              </div>

              {/* Hamster Cage Pass */}
              <div className="p-2.5 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                  <MaterialIcon
                    src={MATERIAL_ICONS.hamsterCagePass}
                    alt="Hamster Cage Pass"
                    size="xs"
                  />
                  <span className="truncate">Hamster Cage</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={resources.hamsterCagePass || ''}
                  onChange={(e) => updateHamsterCagePass(Math.max(0, Number(e.target.value)))}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Investigator Logs Breakdown */}
            <div className="p-3 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-2">
              <span className="text-[11px] font-mono text-zzz-text-muted uppercase tracking-wider block font-semibold">
                Investigator Logs (EXP Sources)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.investigatorLogs.trainee}
                      alt="Trainee Log"
                      size="xs"
                    />
                    <span>Trainee (+100)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.investigatorLogs.trainee || ''}
                    onChange={(e) =>
                      updateInvestigatorLogs({ trainee: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.investigatorLogs.official}
                      alt="Official Log"
                      size="xs"
                    />
                    <span>Official (+600)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.investigatorLogs.official || ''}
                    onChange={(e) =>
                      updateInvestigatorLogs({ official: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.investigatorLogs.senior}
                      alt="Senior Log"
                      size="xs"
                    />
                    <span>Senior (+3000)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.investigatorLogs.senior || ''}
                    onChange={(e) =>
                      updateInvestigatorLogs({ senior: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Certification Seals */}
        {(activeTab === 'all' || activeTab === 'seals') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zzz-border-subtle pb-2">
              <span className="font-mono text-xs text-zzz-text-secondary uppercase tracking-wider font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zzz-accent" />
                Class Certification Seals (Basic / Advanced / Top-Tier)
              </span>
              <Badge variant="outline" size="xs">
                7 CLASSES
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {data.classes.map((cls) => {
                const icons = getSealIcons(cls);
                const classIcon = getClassIcon(cls);
                const sealState = resources.seals[cls] || { basic: 0, advanced: 0, topTier: 0 };

                return (
                  <div
                    key={cls}
                    className="p-3 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="font-display font-bold text-xs uppercase text-white flex items-center gap-1.5">
                        {classIcon && <MaterialIcon src={classIcon} alt={cls} size="xs" />}
                        {cls}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.basic && (
                            <MaterialIcon src={icons.basic} alt="Basic" size="xs" />
                          )}
                          <span>Bas</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={sealState.basic || ''}
                          onChange={(e) =>
                            updateSeals(cls, { basic: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.advanced && (
                            <MaterialIcon src={icons.advanced} alt="Adv" size="xs" />
                          )}
                          <span>Adv</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={sealState.advanced || ''}
                          onChange={(e) =>
                            updateSeals(cls, { advanced: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.topTier && (
                            <MaterialIcon src={icons.topTier} alt="Top" size="xs" />
                          )}
                          <span>Top</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={sealState.topTier || ''}
                          onChange={(e) =>
                            updateSeals(cls, { topTier: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 3: Element Chips */}
        {(activeTab === 'all' || activeTab === 'chips') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zzz-border-subtle pb-2">
              <span className="font-mono text-xs text-zzz-text-secondary uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-zzz-secondary" />
                Elemental Skill Chips (Basic / Advanced / Specialized)
              </span>
              <Badge variant="outline" size="xs">
                7 ELEMENTS
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {data.elements.map((elem) => {
                const icons = getChipIcons(elem);
                const elemIcon = getElementIcon(elem);
                const chipState = resources.chips[elem] || { basic: 0, advanced: 0, specialized: 0 };

                return (
                  <div
                    key={elem}
                    className="p-3 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="font-display font-bold text-xs uppercase text-white flex items-center gap-1.5">
                        {elemIcon && <MaterialIcon src={elemIcon} alt={elem} size="xs" />}
                        {elem}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.basic && (
                            <MaterialIcon src={icons.basic} alt="Basic" size="xs" />
                          )}
                          <span>Bas</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={chipState.basic || ''}
                          onChange={(e) =>
                            updateChips(elem, { basic: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.advanced && (
                            <MaterialIcon src={icons.advanced} alt="Adv" size="xs" />
                          )}
                          <span>Adv</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={chipState.advanced || ''}
                          onChange={(e) =>
                            updateChips(elem, { advanced: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                          {icons?.specialized && (
                            <MaterialIcon src={icons.specialized} alt="Spec" size="xs" />
                          )}
                          <span>Spec</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={chipState.specialized || ''}
                          onChange={(e) =>
                            updateChips(elem, { specialized: Math.max(0, Number(e.target.value)) })
                          }
                          className={tierInputClass}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 4: W-Engine Materials */}
        {(activeTab === 'all' || activeTab === 'wengine') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zzz-border-subtle pb-2">
              <span className="font-mono text-xs text-zzz-text-secondary uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-zzz-accent" />
                W-Engine Materials (EXP & Ascension Components)
              </span>
              <Badge variant="outline" size="xs">
                EQUIPMENT
              </Badge>
            </div>

            {/* EXP Materials */}
            <div className="p-3 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-2">
              <span className="text-[11px] font-mono text-zzz-text-muted uppercase tracking-wider block font-semibold">
                W-Engine Battery EXP
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.wEngineExp.basic}
                      alt="Basic Battery"
                      size="xs"
                    />
                    <span>Basic EXP (+100)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.wEngineExpMaterials?.basic || ''}
                    onChange={(e) =>
                      updateWEngineExpMaterials({ basic: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.wEngineExp.advanced}
                      alt="Advanced Battery"
                      size="xs"
                    />
                    <span>Advanced EXP (+600)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.wEngineExpMaterials?.advanced || ''}
                    onChange={(e) =>
                      updateWEngineExpMaterials({ advanced: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-zzz-text-secondary">
                    <MaterialIcon
                      src={MATERIAL_ICONS.wEngineExp.expert}
                      alt="Expert Battery"
                      size="xs"
                    />
                    <span>Expert EXP (+3000)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={resources.wEngineExpMaterials?.expert || ''}
                    onChange={(e) =>
                      updateWEngineExpMaterials({ expert: Math.max(0, Number(e.target.value)) })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Ascension Components by Class */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zzz-text-muted uppercase tracking-wider block font-semibold">
                W-Engine Modification Components by Class
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {data.classes.map((cls) => {
                  const icons = getWEngineAscensionIcons(cls);
                  const classIcon = getClassIcon(cls);
                  const wAscState = resources.wEngineAscensionMaterials?.[cls] || {
                    basic: 0,
                    advanced: 0,
                    expert: 0,
                  };

                  return (
                    <div
                      key={cls}
                      className="p-3 bg-black/25 rounded-sm border border-zzz-border-subtle space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="font-display font-bold text-xs uppercase text-white flex items-center gap-1.5">
                          {classIcon && <MaterialIcon src={classIcon} alt={cls} size="xs" />}
                          {cls}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                            {icons?.basic && (
                              <MaterialIcon src={icons.basic} alt="Basic" size="xs" />
                            )}
                            <span>Bas</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={wAscState.basic || ''}
                            onChange={(e) =>
                              updateWEngineAscensionMaterials(cls, {
                                basic: Math.max(0, Number(e.target.value)),
                              })
                            }
                            className={tierInputClass}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                            {icons?.advanced && (
                              <MaterialIcon src={icons.advanced} alt="Adv" size="xs" />
                            )}
                            <span>Adv</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={wAscState.advanced || ''}
                            onChange={(e) =>
                              updateWEngineAscensionMaterials(cls, {
                                advanced: Math.max(0, Number(e.target.value)),
                              })
                            }
                            className={tierInputClass}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zzz-text-muted flex items-center gap-1">
                            {icons?.expert && (
                              <MaterialIcon src={icons.expert} alt="Spec" size="xs" />
                            )}
                            <span>Spec</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={wAscState.expert || ''}
                            onChange={(e) =>
                              updateWEngineAscensionMaterials(cls, {
                                expert: Math.max(0, Number(e.target.value)),
                              })
                            }
                            className={tierInputClass}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
