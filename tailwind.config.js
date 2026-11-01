/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zzz: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-hover': 'var(--color-surface-hover)',
          'surface-raised': 'var(--color-surface-raised)',
          'surface-sunken': 'var(--color-surface-sunken)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          'accent-muted': 'var(--color-accent-muted)',
          secondary: 'var(--color-secondary)',
          'secondary-muted': 'var(--color-secondary-muted)',
          text: 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          'border-subtle': 'var(--border-subtle)',
          border: 'var(--border-default)',
          'border-strong': 'var(--border-strong)',
          'border-accent': 'var(--border-accent)',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'Rajdhani', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
