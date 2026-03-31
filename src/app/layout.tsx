import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClickEffects from '@/components/ui/ClickEffects';
import ScrollProgress from '@/components/ui/ScrollProgress';
import GlobalCanvas from '@/components/ui/GlobalCanvas';
import FloatingSupport from '@/components/ui/FloatingSupport';

export const metadata: Metadata = {
  title: 'Pokemoners | Dari kolektor, untuk kolektor',
  description: 'Pusat utama untuk mengetahui lore Pokémon, kartu TCG, dan cek harga akurat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
       <body className="relative min-h-screen">
        <Providers>
          <GlobalCanvas />
          <ScrollProgress />
          <ClickEffects />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>

          <FloatingSupport />
          
        </Providers>
      </body>
    </html>
  );
}
