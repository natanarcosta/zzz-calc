interface MaterialIconProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const MaterialIcon = ({ src, alt, size = 'md', className = '' }: MaterialIconProps) => {
  if (!src) {
    return (
      <span
        aria-label={alt}
        className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center bg-zzz-surface-raised text-[10px] text-zzz-text-muted rounded`}
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${sizeClasses[size]} ${className} object-contain shrink-0 select-none`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.opacity = '0.3';
      }}
    />
  );
};
