'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  const getLinkClass = (path: string, defaultBg: string, defaultRotate: string) => {
    const isActive = pathname.startsWith(path);
    if (isActive) {
      return `bg-pastel-pink text-white px-1.5 py-1 md:px-3 md:py-1.5 border-[2px] md:border-[3px] border-black-coral font-black uppercase tracking-wider shadow-[2px_2px_0_var(--color-black-coral)] md:shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px transition-all hand-drawn-btn transform ${defaultRotate} scale-105 hover-wiggle text-[9px] md:text-sm`;
    }
    return `${defaultBg} text-super-dark px-1.5 py-1 md:px-3 md:py-1.5 border-[2px] md:border-black-coral font-black uppercase tracking-wider shadow-[2px_2px_0_var(--color-black-coral)] md:shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px transition-all hand-drawn-alt transform ${defaultRotate} hover-wiggle text-[9px] md:text-sm`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black-coral bg-creamy-linen/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group hover-wiggle">
          <div className="relative w-12 h-12 flex items-center justify-center transition-colors transform group-hover:rotate-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-black-coral">
              {/* Hand-drawn offset paths */}
              <path d="M2 12 C 2 6 7 2 13 1.5 C 19 1 23 5 22 12 Z" className="text-pastel-pink group-hover:text-pastel-lavender transition-colors" fill="currentColor" />
              <path d="M22 12 C 23 18 19 23 11 22.5 C 5 22 1 18 2 12 Z" className="text-white" fill="currentColor" />
              <path d="M1.5 12.5 Q 6 11 10 12 Q 15 13 22.5 11.5" stroke="currentColor" strokeWidth="2.5" />
              <path d="M9.5 12 A 2.5 3 0 1 1 14.5 11.5 A 3 2.5 0 1 1 9.5 12" fill="white" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="font-handdrawn font-black text-[2.5rem] tracking-tight text-super-dark group-hover:text-pastel-pink transition-colors leading-none pt-2 hidden md:block">
            Pokemoners
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          <nav className="flex items-center gap-1.5 md:gap-6 font-medium">
            <Link href="/cards" className={getLinkClass('/cards', 'bg-dutch-white', '-rotate-2')}>{t('card_wiki')}</Link>
            <Link href="/sets" className={getLinkClass('/sets', 'bg-creamy-almond', 'rotate-1')}>{t('packs_wiki')}</Link>
            <Link href="/pricing" className={getLinkClass('/pricing', 'bg-dutch-white', 'rotate-2')}>{t('price_check')}</Link>
          </nav>

          <div className="flex items-center bg-dutch-white rounded-full p-0.5 md:p-1 border-[2px] md:border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] md:shadow-[4px_4px_0_var(--color-black-coral)] mx-1 md:mx-2 hand-drawn">
            <button 
              onClick={() => setLang('id')}
              className={`px-2 md:px-3 py-1 text-[9px] md:text-xs font-black transition-colors hand-drawn-btn ${lang === 'id' ? 'bg-pastel-pink text-white border-2 border-black-coral shadow-sm' : 'text-rhythm-blue hover:text-black-coral'}`}
            >
              ID
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-2 md:px-3 py-1 text-[9px] md:text-xs font-black transition-colors hand-drawn-btn ${lang === 'en' ? 'bg-pastel-pink text-white border-2 border-black-coral shadow-sm' : 'text-rhythm-blue hover:text-black-coral'}`}
            >
              EN
            </button>
          </div>

          <div className="relative group hidden md:block">
            <button className="flex items-center gap-2 bg-white px-3 py-1.5 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px transition-all hand-drawn-btn transform rotate-[-3deg] hover:rotate-1 z-20 relative">
              <span className="font-handdrawn font-black uppercase text-sm text-super-dark pt-1">Support Us</span>
              <span className="text-pastel-pink text-sm animate-pulse">❤️</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 w-48 origin-top-right">
              <div className="bg-creamy-linen border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] p-3 flex flex-col gap-3 hand-drawn-alt rotate-2">
                <a href="https://saweria.co/lexyerresta" target="_blank" rel="noopener noreferrer" className="bg-pastel-pink text-white font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:bg-terracotta transition-colors hand-drawn-btn hover:-translate-y-px hover:-rotate-2 rotate-1 text-center">
                  ✨ Saweria
                </a>
                <a href="https://trakteer.id/lexyerresta" target="_blank" rel="noopener noreferrer" className="bg-wintergreen text-super-dark font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:bg-mustard transition-colors hand-drawn-btn hover:-translate-y-px hover:rotate-2 -rotate-1 text-center">
                  ☕ Trakteer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
