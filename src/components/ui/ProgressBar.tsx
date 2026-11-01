interface ProgressBarProps {
  label?: string;
  value: number; // percentage 0 - 100
  detail?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercent?: boolean;
  className?: string;
}

export const ProgressBar = ({
  label,
  value,
  detail,
  size = 'md',
  showPercent = true,
  className = '',
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  const getStatusColor = (val: number) => {
    if (val >= 100) return 'bg-zzz-success';
    if (val >= 50) return 'bg-zzz-secondary';
    return 'bg-zzz-danger';
  };

  const getTextStatusColor = (val: number) => {
    if (val >= 100) return 'text-zzz-success';
    if (val >= 50) return 'text-zzz-secondary';
    return 'text-zzz-danger';
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {(label || showPercent || detail) && (
        <div className="flex justify-between items-baseline text-xs font-mono">
          {label && (
            <span className="text-zzz-text-secondary truncate flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zzz-accent rounded-full inline-block" />
              {label}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {detail && <span className="text-[11px] text-zzz-text-muted">{detail}</span>}
            {showPercent && (
              <span className={`font-bold tabular-nums ${getTextStatusColor(clamped)}`}>
                {clamped.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-black/40 rounded-sm overflow-hidden border border-zzz-border-subtle p-[1px] ${heightClasses[size]}`}>
        <div
          className={`${getStatusColor(clamped)} h-full rounded-sm transition-all duration-300 relative`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
