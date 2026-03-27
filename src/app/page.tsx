'use client';

import UniversalSearch from '@/components/UniversalSearch';
import FeatureCard from '@/components/ui/FeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-x-hidden pb-20 relative">
      
      {/* Decorative Stickers */}
      <div className="absolute top-24 right-4 md:top-20 md:right-32 w-12 h-12 md:w-16 md:h-16 bg-mustard opacity-90 z-20 rotate-12 flex items-center justify-center font-handdrawn font-black text-xl md:text-2xl border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hand-drawn-btn hover:scale-110 transition-transform cursor-pointer">
        ✨
      </div>
      <div className="absolute top-36 left-2 md:top-40 md:left-24 w-20 h-8 md:w-28 md:h-10 bg-pastel-pink/90 z-20 -rotate-12 border-2 md:border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] md:shadow-[4px_4px_0_var(--color-black-coral)] flex items-center justify-center font-handdrawn font-black text-white text-sm md:text-xl hand-drawn hover:rotate-0 transition-transform cursor-pointer">
        Holo!
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center mt-12 md:mt-0"
      >
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4 md:mb-6 flex justify-center items-center drop-shadow-[4px_4px_0_var(--color-black-coral)] transition-transform hover:rotate-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-black-coral transition-colors">
            {/* Hand-drawn offset paths */}
            <path d="M2 12 C 2 6 7 2 13 1.5 C 19 1 23 5 22 12 Z" className="text-pastel-pink hover:text-pastel-lavender transition-colors" fill="currentColor" />
            <path d="M22 12 C 23 18 19 23 11 22.5 C 5 22 1 18 2 12 Z" className="text-white" fill="currentColor" />
            <path d="M1.5 12.5 Q 6 11 10 12 Q 15 13 22.5 11.5" stroke="currentColor" strokeWidth="2.5" />
            <path d="M9.5 12 A 2.5 3 0 1 1 14.5 11.5 A 3 2.5 0 1 1 9.5 12" fill="white" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>
        <h1 className="text-[4.5rem] md:text-[8rem] font-black mb-1 md:mb-2 tracking-tighter text-super-dark pb-2 drop-shadow-sm filter font-handdrawn leading-none">
          Pokemoners
        </h1>
        <div className="inline-block bg-pastel-pink border-2 border-black-coral text-white font-black px-4 py-1 md:px-6 md:py-2 text-xl md:text-3xl mb-6 tracking-widest shadow-[4px_4px_0_var(--color-black-coral)] transform -rotate-2 hover:rotate-1 transition-transform hand-drawn font-handdrawn">
          Dari Kolektor, Untuk Kolektor
        </div>
        <p className="text-lg md:text-xl text-black-coral mb-8 max-w-2xl font-bold whitespace-pre-line leading-relaxed px-2">
          {t('motto').replace('"Dari kolektor, untuk kolektor."\n', '').replace('"By collectors, for collectors."\n', '')}
        </p>
      </motion.div>

      <motion.div 
        className="w-full relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <UniversalSearch />
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row justify-center gap-6 mt-16 max-w-4xl w-full mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.5 }
          }
        }}
      >
        <div className="absolute top-0 right-10 w-48 h-48 bg-pastel-pink rounded-full opacity-30 blur-2xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-wintergreen rounded-full opacity-20 blur-3xl -z-10 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-mustard rounded-full opacity-20 blur-2xl -z-10 animate-bounce" />

        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, rotate: -5 }, visible: { opacity: 1, scale: 1, rotate: -3 } }} className="flex-1 hand-drawn-alt">
          <FeatureCard 
            title={t('card_wiki')}
            desc={t('card_desc')}
            href="/cards" 
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-pastel-pink drop-shadow-sm">
                <rect x="4" y="3" width="16" height="18" rx="2" ry="2" />
                <path d="M9 8h.01 M15 16h.01 M8 12h8 M10 14l2-2 2 2" className="text-black-coral" />
              </svg>
            }
          />
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, rotate: 2 }, visible: { opacity: 1, scale: 1, rotate: 1 } }} className="flex-1 hand-drawn">
          <FeatureCard 
            title={t('packs_wiki')}
            desc="Cari tahu isi semua ekspansi kartu Pokémon dari yang paling lawas sampai terbaru."
            href="/sets" 
            icon={
              <span className="text-5xl drop-shadow-sm rotate-12 inline-block">📦</span>
            }
          />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, rotate: 5 }, visible: { opacity: 1, scale: 1, rotate: 4 } }} className="flex-1 hand-drawn">
          <FeatureCard 
            title={t('price_check')}
            desc={t('price_desc')}
            href="/pricing" 
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-wintergreen drop-shadow-sm">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10 M10 9.5c0-.8.6-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5" className="text-black-coral" />
              </svg>
            }
          />
        </motion.div>
      </motion.div>

      {/* Hero spacing */}
      <div className="h-32" />
    </div>
  );
}
