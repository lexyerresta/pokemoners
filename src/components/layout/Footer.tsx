'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="relative mt-16 mb-12 py-10 border-[4px] border-black-coral text-center text-sm text-super-dark bg-dutch-white shadow-[8px_8px_0_var(--color-black-coral)] z-10 mx-4 max-w-xl self-center w-[calc(100%-2rem)] hand-drawn">
      <div className="absolute -top-6 left-[10%] w-32 h-10 bg-pastel-pink border-[3px] border-dashed border-black-coral/30 -rotate-3 z-30 opacity-90 shadow-[2px_2px_0_var(--color-black-coral)] hand-drawn"></div>
      <div className="absolute -top-8 right-[15%] w-24 h-12 bg-mustard border-[3px] border-black-coral rotate-6 z-30 opacity-90 shadow-[4px_4px_0_var(--color-black-coral)] hand-drawn-alt"></div>

      {/* Individual Pokémon Stickers - SITTING ON THE TOP RIDGE of the card */}
      <div className="absolute -top-28 md:-top-44 left-0 w-full flex justify-center items-end gap-1 md:gap-4 z-50 pointer-events-none overflow-visible">
        
        {/* Pikachu - Left */}
        <motion.div 
          initial={{ y: 20, opacity: 0, rotate: -12 }}
          whileInView={{ y: 0, opacity: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-28 h-28 md:w-36 md:h-36 mb-0.5"
        >
          <Image 
            src="/images/pikachu-clean-v7.png" 
            alt="Pikachu" 
            width={160} 
            height={160}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Charizard - Center */}
        <motion.div 
          initial={{ y: 20, opacity: 0, rotate: 2 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-40 h-40 md:w-56 md:h-56 -mx-4 md:-mx-12"
        >
          <Image 
            src="/images/charizard-clean-v7.png" 
            alt="Charizard" 
            width={260} 
            height={260}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Gengar - Right */}
        <motion.div 
          initial={{ y: 20, opacity: 0, rotate: 12 }}
          whileInView={{ y: 0, opacity: 1, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-28 h-28 md:w-32 md:h-32 mb-1 md:mb-2"
        >
          <Image 
            src="/images/gengar-clean-v7.png" 
            alt="Gengar" 
            width={160} 
            height={160}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="inline-block bg-white px-8 py-6 border-[4px] border-black-coral shadow-[6px_6px_0_var(--color-pastel-lavender)] hand-drawn hover:rotate-1 hover:scale-105 transition-transform group cursor-pointer relative z-20 mx-4" style={{ isolation: 'isolate' }}>
        
        <p className="font-black font-handdrawn text-4xl md:text-5xl tracking-widest text-super-dark group-hover:text-rhythm-blue transition-colors">
          Pokemoners
        </p>
        <div className="font-bold text-xs md:text-sm mt-4 uppercase tracking-[0.2em] text-rhythm-blue flex flex-col sm:flex-row items-center justify-center gap-2">
           {/* Motto already handled by general t() if needed, but here it's decorative pieces */}
          <span className="bg-mustard text-super-dark px-3 py-1 border-[3px] border-black-coral rotate-[-3deg] inline-block shadow-[3px_3px_0_var(--color-black-coral)] hand-drawn-alt">
            {lang === 'id' ? 'Dari Kolektor' : 'From Collectors'}
          </span>
          <span className="mt-1 sm:mt-0">
            {lang === 'id' ? 'Untuk Kolektor' : 'For Collectors'}
          </span>
        </div>
      </div>
    </footer>
  );
}
