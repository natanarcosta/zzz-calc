import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-zzz-surface-raised text-zzz-text-secondary border-zzz-border-subtle',
  accent: 'bg-zzz-accent/15 text-zzz-accent border-zzz-accent/40 font-semibold',
  secondary: 'bg-zzz-secondary/15 text-zzz-secondary border-zzz-secondary/40 font-semibold',
  success: 'bg-zzz-success/15 text-zzz-success border-zzz-success/40',
  danger: 'bg-zzz-danger/15 text-zzz-danger border-zzz-danger/40 font-semibold',
  warning: 'bg-zzz-warning/15 text-zzz-warning border-zzz-warning/40',
  outline: 'bg-transparent text-zzz-text-secondary border-zzz-border',
};

const dotColors: Record<string, string> = {
  default: 'bg-zzz-text-muted',
  accent: 'bg-zzz-accent animate-pulse',
  secondary: 'bg-zzz-secondary',
  success: 'bg-zzz-success',
  danger: 'bg-zzz-danger',
  warning: 'bg-zzz-warning',
  outline: 'bg-zzz-text-secondary',
};

const sizeStyles = {
  xs: 'px-1.5 py-0.5 text-[10px] tracking-wider uppercase',
  sm: 'px-2 py-0.5 text-xs tracking-wider uppercase',
  md: 'px-2.5 py-1 text-xs tracking-wide uppercase',
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display border rounded-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || 'bg-current'}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
