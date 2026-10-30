import type { ReactNode } from 'react';

interface MaterialIconProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const MaterialIcon = ({ src, alt, size = 'md', className = '' }: MaterialIconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${className} object-contain`}
      onError={(e) => {
        // Fallback if image doesn't load
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};
