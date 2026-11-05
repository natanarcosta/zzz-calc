import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent-outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  fullWidth?: boolean;
  cutCorner?: boolean;
}

const variantStyles = {
  primary:
    'bg-zzz-accent hover:bg-zzz-accent-hover active:bg-[#e05824] text-black font-black tracking-wider border border-transparent shadow-sm hover:shadow-[0_0_12px_rgba(255,107,53,0.35)]',
  secondary:
    'bg-zzz-surface-raised hover:bg-zzz-surface-hover active:bg-zzz-surface text-zzz-text border border-zzz-border hover:border-zzz-border-strong font-bold',
  danger:
    'bg-zzz-danger/15 hover:bg-zzz-danger/25 active:bg-zzz-danger/35 text-zzz-danger border border-zzz-danger/40 hover:border-zzz-danger font-bold',
  ghost:
    'bg-transparent hover:bg-white/5 active:bg-white/10 text-zzz-text-secondary hover:text-white border border-transparent font-medium',
  'accent-outline':
    'bg-zzz-accent/10 hover:bg-zzz-accent/20 text-zzz-accent border border-zzz-accent/50 hover:border-zzz-accent font-bold',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs gap-1.5',
  md: 'px-3.5 py-1.5 text-xs sm:text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2.5',
};

export const Button = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  fullWidth = false,
  cutCorner = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-display uppercase transition-all duration-150 select-none zzz-focus-ring disabled:opacity-40 disabled:cursor-not-allowed ${
        cutCorner ? 'zzz-cut-corner-br-sm' : 'rounded-sm'
      } ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
