import { Users, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface DashboardOverviewProps {
  selectedCount: number;
  averageProgress: number;
  missingItemCount: number;
}

export const DashboardOverview = ({
  selectedCount,
  averageProgress,
  missingItemCount,
}: DashboardOverviewProps) => {
  const isAllComplete = missingItemCount === 0 && averageProgress >= 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Metric 1: Selected Targets */}
      <div className="bg-zzz-surface rounded-sm border border-zzz-border hover:border-zzz-border-strong p-3.5 flex items-center justify-between transition-colors zzz-cut-corner-br">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-zzz-accent shrink-0 zzz-chamfer-sm">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zzz-text-muted block">
              // 01. ACTIVE_TARGETS
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-display text-2xl font-black text-white tabular-nums tracking-wide">
                {String(selectedCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono uppercase tracking-wider">
                {selectedCount === 1 ? 'AGENT' : 'AGENTS'}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={selectedCount > 0 ? 'accent' : 'default'} size="xs" chamfer>
          {selectedCount > 0 ? 'TRACKING' : 'IDLE'}
        </Badge>
      </div>

      {/* Metric 2: Material Shortages */}
      <div className="bg-zzz-surface rounded-sm border border-zzz-border hover:border-zzz-border-strong p-3.5 flex items-center justify-between transition-colors zzz-cut-corner-br">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center shrink-0 border zzz-chamfer-sm ${
              missingItemCount > 0
                ? 'bg-zzz-danger/15 text-zzz-danger border-zzz-danger/40'
                : 'bg-zzz-success/15 text-zzz-success border-zzz-success/40'
            }`}
          >
            {missingItemCount > 0 ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zzz-text-muted block">
              // 02. SHORTAGE_AUDIT
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`font-display text-2xl font-black tabular-nums tracking-wide ${
                  missingItemCount > 0 ? 'text-zzz-danger' : 'text-zzz-success'
                }`}
              >
                {String(missingItemCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono uppercase tracking-wider">
                {missingItemCount === 1 ? 'SHORTAGE' : 'SHORTAGES'}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={missingItemCount > 0 ? 'danger' : 'success'} size="xs" dot chamfer>
          {missingItemCount > 0 ? 'DEFICIT' : 'READY'}
        </Badge>
      </div>

      {/* Metric 3: Overall Readiness */}
      <div className="bg-zzz-surface rounded-sm border border-zzz-border hover:border-zzz-border-strong p-3.5 flex items-center justify-between transition-colors zzz-cut-corner-br">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center shrink-0 border zzz-chamfer-sm ${
              isAllComplete
                ? 'bg-zzz-success/15 text-zzz-success border-zzz-success/40'
                : averageProgress > 0
                ? 'bg-zzz-secondary/15 text-zzz-secondary border-zzz-secondary/40'
                : 'bg-white/5 text-zzz-text-muted border-white/10'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zzz-text-muted block">
              // 03. READINESS_RATE
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`font-display text-2xl font-black tabular-nums tracking-wide ${
                  isAllComplete
                    ? 'text-zzz-success'
                    : averageProgress > 0
                    ? 'text-zzz-secondary'
                    : 'text-zzz-text-muted'
                }`}
              >
                {averageProgress.toFixed(1)}%
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono uppercase tracking-wider">TOTAL</span>
            </div>
          </div>
        </div>
        <Badge
          variant={isAllComplete ? 'success' : averageProgress >= 50 ? 'secondary' : averageProgress > 0 ? 'accent' : 'default'}
          size="xs"
          chamfer
        >
          {isAllComplete ? 'COMPLETE' : `${(100 - averageProgress).toFixed(0)}% TO GO`}
        </Badge>
      </div>
    </div>
  );
};
