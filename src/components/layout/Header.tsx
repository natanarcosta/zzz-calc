import { useState } from 'react';
import { useResources } from '../../hooks/useResources';
import { useCharacters } from '../../hooks/useCharacters';
import { RotateCcw, Cpu, Terminal, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export const Header = () => {
  const { resetResources } = useResources();
  const { selectedCharacters } = useCharacters();
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleConfirmReset = () => {
    resetResources();
    setIsResetOpen(false);
  };

  return (
    <>
      <header className="shrink-0 bg-zzz-surface/95 backdrop-blur-md border-b border-zzz-border sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-zzz-accent to-[#d44810] flex items-center justify-center text-black font-black shadow-md shadow-zzz-accent/25 zzz-chamfer-sm shrink-0">
              <Cpu className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl text-white tracking-wider uppercase flex items-center gap-1.5">
                  <span className="text-white">ZZZ</span>
                  <span className="text-zzz-accent">CALC</span>
                </span>
                <Badge variant="accent" size="xs" dot chamfer>
                  ONLINE
                </Badge>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-zzz-text-muted hidden sm:block tracking-wider uppercase">
                H.I.A. RESOURCE TERMINAL // NEW ERIDU PROTOCOL
              </p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden md:flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-sm border border-white/10 font-mono text-xs text-zzz-text-secondary zzz-cut-corner-br-sm">
              <Users className="w-3.5 h-3.5 text-zzz-accent" />
              <span>AGENTS:</span>
              <span className="text-white font-bold">{selectedCharacters.length}</span>
              <span className="text-white/20">|</span>
              <Terminal className="w-3.5 h-3.5 text-zzz-secondary" />
              <span>STORAGE:</span>
              <span className="text-zzz-success font-semibold">LOCAL</span>
            </div>

            <Button
              variant="danger"
              size="sm"
              cutCorner
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => setIsResetOpen(true)}
              title="Reset all resource inventories"
            >
              Reset
            </Button>
          </div>
        </div>
      </header>

      <ConfirmDialog
        isOpen={isResetOpen}
        title="Reset Resource Inventory"
        message="Are you sure you want to reset all stored resource counts to zero? This action cannot be reversed."
        confirmText="Confirm Reset"
        cancelText="Cancel"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetOpen(false)}
      />
    </>
  );
};
