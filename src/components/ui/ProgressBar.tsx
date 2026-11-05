import type { ReactNode } from 'react';

interface ProgressBarProps {
  label?: string;
  value: number; // percentage 0 - 100
  detail?: string;
  icon?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showPercent?: boolean;
  className?: string;
}

export const ProgressBar = ({
  label,
  value,
  detail,
  icon,
  size = 'md',
  showPercent = true,
  className = '',
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  const getStatusColor = (val: number) => {
    if (val >= 100) return 'bg-zzz-success shadow-[0_0_8px_rgba(119,214,160,0.5)]';
    if (val > 0) return 'bg-zzz-secondary shadow-[0_0_8px_rgba(245,230,66,0.35)]';
    return 'bg-zzz-danger/60';
  };

  const getTextStatusColor = (val: number) => {
    if (val >= 100) return 'text-zzz-success';
    if (val > 0) return 'text-zzz-secondary';
    return 'text-zzz-danger';
  };

  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {(label || showPercent || detail) && (
        <div className="flex justify-between items-baseline text-xs font-mono">
          {label && (
            <span className="text-zzz-text-secondary truncate flex items-center gap-1.5 font-medium">
              {icon ? (
                <span className="shrink-0">{icon}</span>
              ) : (
                <span className="w-1 h-1 bg-zzz-accent rounded-full inline-block shrink-0" />
              )}
              <span className="truncate">{label}</span>
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {detail && <span className="text-[11px] text-zzz-text-muted">{detail}</span>}
            {showPercent && (
              <span className={`font-bold tabular-nums text-xs ${getTextStatusColor(clamped)}`}>
                {clamped.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div
        className={`w-full bg-black/60 rounded-sm overflow-hidden border border-white/10 p-[1px] ${heightClasses[size]}`}
      >
        <div
          className={`${getStatusColor(clamped)} h-full rounded-sm transition-all duration-300 relative`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
