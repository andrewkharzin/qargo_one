import { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}