import type { ReactNode } from 'react';

export interface PanelProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  tag?: string;
  className?: string;
  bodyClassName?: string;
  variant?: 'default' | 'raised' | 'sunken' | 'accent';
}

const variantStyles = {
  default: 'bg-zzz-surface border-zzz-border',
  raised: 'bg-zzz-surface-raised border-zzz-border-strong',
  sunken: 'bg-zzz-surface-sunken border-zzz-border-subtle',
  accent: 'bg-zzz-surface border-zzz-accent/40 shadow-lg shadow-zzz-accent/5',
};

export const Panel = ({
  children,
  title,
  subtitle,
  badge,
  action,
  tag,
  className = '',
  bodyClassName = '',
  variant = 'default',
}: PanelProps) => {
  return (
    <div
      className={`rounded-sm border relative overflow-hidden transition-colors ${variantStyles[variant]} ${className}`}
    >
      {(title || tag || badge || action) && (
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zzz-border-subtle bg-black/20">
          <div className="flex items-center gap-2 min-w-0">
            {tag && (
              <span className="text-[10px] font-mono tracking-widest text-zzz-accent uppercase font-semibold">
                {tag}
              </span>
            )}
            {title && (
              <div className="min-w-0">
                <h3 className="font-display text-sm md:text-base font-bold text-zzz-text tracking-wide uppercase truncate">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-[11px] text-zzz-text-muted truncate">{subtitle}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {badge}
            {action}
          </div>
        </div>
      )}
      <div className={`p-3.5 md:p-4 ${bodyClassName}`}>{children}</div>
    </div>
  );
};
