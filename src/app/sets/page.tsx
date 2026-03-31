'use client';

import { useQuery } from '@tanstack/react-query';
import { getTcgSets } from '@/lib/tcgApi';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { PacksIcon } from '@/components/ui/CustomIcons';

export default function SetsList() {
  const [q, setQ] = useState('');
  const [showOpening, setShowOpening] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Session tracking removed from here, moving to SetDetail
  }, []);
  
  const { data: sets, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: getTcgSets,
  });

  const filteredSets = sets?.filter((s: any) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="page-container relative min-h-screen">
      <AnimatePresence>
        {/* PackOpener moved to SetDetail */}
      </AnimatePresence>

      <motion.div
        initial={showOpening ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="page-title font-handdrawn text-5xl md:text-7xl mb-6">{t('packs_wiki')}</h1>
        
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-dutch-white p-4 border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn z-10 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pastel-pink/90 border-2 border-dashed border-black-coral/20 backdrop-blur-xs z-20 shadow-sm rotate-[3deg] opacity-90 hand-drawn"></div>
          <input 
            type="text" 
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 w-full bg-white border-[3px] border-black-coral px-5 py-3 font-black text-super-dark placeholder-rhythm-blue outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0_var(--color-pastel-pink)] hand-drawn-alt transition-all"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {[...Array(12)].map((_, i) => (
               <div key={i} className={`h-32 bg-creamy-almond border-4 border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] hand-drawn ${i%2===0 ? 'rotate-1' : '-rotate-2'} animate-pulse`} />
             ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {filteredSets?.map((set: any, i: number) => {
              const rotate = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[3deg]', 'rotate-[-1deg]'][set.name.length % 4];
              return (
                <motion.div key={set.id} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                  <Link 
                    href={`/sets/${set.id}`} 
                    className={`block bg-white p-4 pb-6 border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] hover:shadow-[4px_4px_0_var(--color-pastel-pink)] hover:-translate-y-2 hover:scale-105 transition-all hand-drawn group relative z-10 hover-wiggle ${rotate}`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-mustard/80 border-2 border-dashed border-black-coral/20 rotate-[-12deg] z-20 shadow-sm group-hover:bg-terracotta hand-drawn-alt transition-colors"></div>
                    
                    <div className="h-20 flex items-center justify-center mb-3 bg-creamy-linen/50 border-2 border-black-coral/20 rounded-lg p-2 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      {set.logo ? (
                        <Image src={`${set.logo}.png`} alt={set.name} width={150} height={80} className="object-contain max-h-full" />
                      ) : (
                        <PacksIcon size={48} className="text-black-coral/40" />
                      )}
                    </div>
                    
                    <h2 className="font-handdrawn text-2xl font-black text-center text-super-dark group-hover:text-rhythm-blue transition-colors truncate">{set.name}</h2>
                    <p className="text-center font-bold text-[10px] text-rhythm-blue uppercase tracking-widest mt-1 border-t-2 border-dashed border-black-coral/30 pt-2">{set.cardCount?.total || '?'} {t('total_cards')}</p>
                  </Link>
                </motion.div>
              );
            })}
            {filteredSets?.length === 0 && (
               <div className="col-span-full text-center text-super-dark py-24 font-handdrawn font-black text-4xl transform -rotate-2">"{q}" {t('not_found')}</div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
