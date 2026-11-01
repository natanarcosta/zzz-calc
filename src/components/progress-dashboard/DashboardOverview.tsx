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
      <div className="bg-zzz-surface rounded-sm border border-zzz-border p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-zzz-accent shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zzz-text-muted block">
              // ACTIVE_TARGETS
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-display text-2xl font-black text-white tabular-nums">
                {String(selectedCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono">AGENTS</span>
            </div>
          </div>
        </div>
        <Badge variant={selectedCount > 0 ? 'accent' : 'default'} size="xs">
          {selectedCount > 0 ? 'TRACKING' : 'IDLE'}
        </Badge>
      </div>

      {/* Metric 2: Material Shortages */}
      <div className="bg-zzz-surface rounded-sm border border-zzz-border p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border ${
              missingItemCount > 0
                ? 'bg-zzz-danger/15 text-zzz-danger border-zzz-danger/30'
                : 'bg-zzz-success/15 text-zzz-success border-zzz-success/30'
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
              // DEFICIT_ITEMS
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`font-display text-2xl font-black tabular-nums ${
                  missingItemCount > 0 ? 'text-zzz-danger' : 'text-zzz-success'
                }`}
              >
                {String(missingItemCount).padStart(2, '0')}
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono">
                {missingItemCount === 1 ? 'SHORTAGE' : 'SHORTAGES'}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={missingItemCount > 0 ? 'danger' : 'success'} size="xs" dot>
          {missingItemCount > 0 ? 'DEFICIT' : 'READY'}
        </Badge>
      </div>

      {/* Metric 3: Overall Readiness */}
      <div className="bg-zzz-surface rounded-sm border border-zzz-border p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border ${
              isAllComplete
                ? 'bg-zzz-success/15 text-zzz-success border-zzz-success/30'
                : averageProgress >= 50
                ? 'bg-zzz-secondary/15 text-zzz-secondary border-zzz-secondary/30'
                : 'bg-zzz-accent/15 text-zzz-accent border-zzz-accent/30'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zzz-text-muted block">
              // OVERALL_READINESS
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`font-display text-2xl font-black tabular-nums ${
                  isAllComplete
                    ? 'text-zzz-success'
                    : averageProgress >= 50
                    ? 'text-zzz-secondary'
                    : 'text-white'
                }`}
              >
                {averageProgress.toFixed(1)}%
              </span>
              <span className="text-xs text-zzz-text-secondary font-mono">TOTAL</span>
            </div>
          </div>
        </div>
        <Badge
          variant={isAllComplete ? 'success' : averageProgress >= 50 ? 'secondary' : 'default'}
          size="xs"
        >
          {isAllComplete ? 'COMPLETE' : `${(100 - averageProgress).toFixed(0)}% TO GO`}
        </Badge>
      </div>
    </div>
  );
};
