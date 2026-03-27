import type { Metadata } from 'next';
import { Caveat } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClickEffects from '@/components/ui/ClickEffects';
import ScrollProgress from '@/components/ui/ScrollProgress';
import GlobalCanvas from '@/components/ui/GlobalCanvas';
import { SUPPORT_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pokemoners | Dari kolektor, untuk kolektor',
  description: 'Pusat utama untuk mengetahui lore Pokémon, kartu TCG, dan cek harga akurat.',
};

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${caveat.variable}`}>
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

          {/* Floating Mobile Support Button */}
          <div className="md:hidden fixed bottom-6 right-4 z-50 group">
            <button className="flex items-center gap-2 bg-white px-4 py-3 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px transition-all hand-drawn-btn transform rotate-[-3deg] hover:rotate-1 z-20 relative">
              <span className="font-handdrawn font-black uppercase text-sm text-super-dark pt-1 tracking-wider">Support Us</span>
              <span className="text-pastel-pink text-xl animate-pulse">❤️</span>
            </button>
            {/* Dropdown Menu (upwards) */}
            <div className="absolute right-0 bottom-full mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 w-48 origin-bottom-right">
              <div className="bg-creamy-linen border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] p-3 flex flex-col gap-3 hand-drawn-alt rotate-2">
                <a href={SUPPORT_LINKS.SAWERIA} target="_blank" rel="noopener noreferrer" className="bg-pastel-pink text-white font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] active:bg-terracotta transition-colors hand-drawn-btn active:-translate-y-px active:-rotate-2 rotate-1 text-center text-sm">
                  ✨ Saweria
                </a>
                <a href={SUPPORT_LINKS.TRAKTEER} target="_blank" rel="noopener noreferrer" className="bg-wintergreen text-super-dark font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] active:bg-mustard transition-colors hand-drawn-btn active:-translate-y-px active:rotate-2 -rotate-1 text-center text-sm">
                  ☕ Trakteer
                </a>
              </div>
            </div>
          </div>
          
        </Providers>
      </body>
    </html>
  );
}
