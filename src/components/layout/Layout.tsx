import type { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-zzz-bg text-zzz-text flex flex-col font-sans relative selection:bg-zzz-accent selection:text-black">
      {/* Top Accent Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-zzz-accent via-zzz-secondary to-zzz-accent opacity-90" />

      <Header />

      <main className="w-full max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6 pb-12 flex-1">
        {children}
      </main>

      <footer className="shrink-0 border-t border-zzz-border-subtle bg-zzz-surface-sunken/60 py-3 px-4 text-center">
        <p className="font-mono text-[11px] text-zzz-text-muted tracking-wider uppercase">
          // PROXY_OS PROTOCOL • ZENLESS ZONE ZERO RESOURCE CALCULATOR • ALL ASSETS BELONG TO HOYOVERSE
        </p>
      </footer>
    </div>
  );
};
