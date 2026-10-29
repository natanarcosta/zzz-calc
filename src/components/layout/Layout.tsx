import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      <main className="w-full max-w-[1600px] mx-auto p-4 lg:p-5 pb-8">
        {children}
      </main>
    </div>
  );
};
