import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {children}
      </main>
    </div>
  );
};
