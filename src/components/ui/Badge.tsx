import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'solid-accent';
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
  chamfer?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-white/5 text-zzz-text-secondary border-zzz-border-subtle font-medium',
  accent: 'bg-zzz-accent/15 text-zzz-accent border-zzz-accent/40 font-bold',
  'solid-accent': 'bg-zzz-accent text-black border-transparent font-black',
  secondary: 'bg-zzz-secondary/15 text-zzz-secondary border-zzz-secondary/40 font-bold',
  success: 'bg-zzz-success/15 text-zzz-success border-zzz-success/40 font-bold',
  danger: 'bg-zzz-danger/15 text-zzz-danger border-zzz-danger/40 font-bold',
  warning: 'bg-zzz-warning/15 text-zzz-warning border-zzz-warning/40 font-bold',
  outline: 'bg-black/30 text-zzz-text-secondary border-zzz-border font-medium',
};

const dotColors: Record<string, string> = {
  default: 'bg-zzz-text-muted',
  accent: 'bg-zzz-accent animate-pulse shadow-[0_0_6px_rgba(255,107,53,0.8)]',
  'solid-accent': 'bg-black',
  secondary: 'bg-zzz-secondary shadow-[0_0_6px_rgba(245,230,66,0.8)]',
  success: 'bg-zzz-success shadow-[0_0_6px_rgba(119,214,160,0.8)]',
  danger: 'bg-zzz-danger animate-pulse shadow-[0_0_6px_rgba(255,100,107,0.8)]',
  warning: 'bg-zzz-warning',
  outline: 'bg-zzz-text-secondary',
};

const sizeStyles = {
  xs: 'px-1.5 py-0.5 text-[10px] tracking-widest uppercase',
  sm: 'px-2 py-0.5 text-[11px] tracking-wider uppercase',
  md: 'px-2.5 py-1 text-xs tracking-wider uppercase',
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  chamfer = false,
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display border select-none ${
        chamfer ? 'zzz-chamfer-sm' : 'rounded-sm'
      } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
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
