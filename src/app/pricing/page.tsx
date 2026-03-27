'use client';
import { useState, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCardPrices } from '@/lib/tcgApi';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

function PricingCard({ card, isEven }: { card: any, isEven: boolean }) {
  const decorations = ['tape', 'pin', 'clip'];
  const decType = decorations[card.name.length % 3];
  
  const [imgSrc, setImgSrc] = useState(card.images?.small || '/card-back.png');

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={`bg-${isEven ? 'dutch-white' : 'creamy-almond'} border-[3px] border-black-coral p-6 flex gap-6 hover:shadow-[10px_10px_0_var(--color-pastel-pink)] shadow-[8px_8px_0_var(--color-black-coral)] transition-all hover:-translate-y-2 hover:-translate-x-1 hover:-rotate-1 hand-drawn relative z-10 hover-wiggle`}>
      {/* Dynamic Decorations */}
      {decType === 'tape' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-pastel-pink/90 border-2 border-dashed border-black-coral/20 backdrop-blur-xs z-20 shadow-sm rotate-[-3deg] opacity-90 hand-drawn"></div>}
      {decType === 'pin' && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[2.5rem] z-20 drop-shadow-sm group-hover:-translate-y-1 transition-transform">📍</div>}
      {decType === 'clip' && <div className="absolute -top-6 right-2 text-[3rem] z-20 drop-shadow-sm rotate-[15deg] group-hover:-translate-y-1 group-hover:rotate-[20deg] transition-transform">📎</div>}
      
      {/* Image Polaroid Frame */}
      <div className={`w-1/3 flex-shrink-0 bg-white border-2 border-black-coral p-2 pb-6 shadow-[2px_2px_0_var(--color-black-coral)] ${isEven ? 'rotate-2' : '-rotate-2'} `}>
         <div className="relative w-full aspect-[2.5/3.5] border-2 border-black-coral overflow-hidden bg-creamy-linen">
           <Image 
             src={imgSrc} 
             alt={card.name} 
             fill
             className={`object-cover ${imgSrc !== '/card-back.png' ? 'filter sepia-[0.1]' : 'p-2'}`}
             onError={() => setImgSrc('/card-back.png')}
           />
           {imgSrc === '/card-back.png' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-dutch-white/90 backdrop-blur-sm z-10 p-2 text-center pointer-events-none">
               <span className="text-terracotta text-sm font-handdrawn font-black border-[3px] border-terracotta px-2 py-1 bg-white shadow-[2px_2px_0_var(--color-terracotta)] rotate-[-10deg] leading-tight">Gagal<br/>Muat</span>
             </div>
           )}
         </div>
         <div className="text-center mt-2 text-xs text-super-dark font-black tracking-widest">{card.id}</div>
      </div>
      
      <div className="w-2/3 flex flex-col justify-between py-2">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-super-dark mb-1 leading-tight uppercase tracking-widest">{card.name || 'TIDAK DIKETAHUI'}</h2>
          {card.set?.name && <div className="inline-block bg-pastel-lavender/50 border-2 border-dashed border-black-coral px-3 py-1 font-bold text-sm text-super-dark transform -rotate-1">{card.set.name}</div>}
        </div>

        <div className="space-y-3">
          {card.tcgplayer?.prices && (
            <div className="bg-white p-3 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] relative">
              <div className="absolute -left-2 top-2 w-4 h-8 bg-pastel-pink border border-black-coral shadow-sm rotate-12"></div>
              <div className="text-xs text-rhythm-blue mb-1 flex justify-between items-center font-bold px-2 uppercase border-b-2 border-dashed border-black-coral/20 pb-1">
                TCGplayer
                <span className="text-[10px] bg-creamy-almond border border-black-coral px-2 rounded-full text-super-dark">{card.tcgplayer.updatedAt}</span>
              </div>
              <div className="text-sm px-2">
                {Object.keys(card.tcgplayer.prices).slice(0, 2).map(variant => {
                  const p = card.tcgplayer.prices[variant];
                  return (
                    <div key={variant} className="flex justify-between items-center py-1 font-black">
                      <span className="capitalize text-super-dark">{variant}</span>
                      <span className="text-wintergreen text-lg">${p.market?.toFixed(2) || '?'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {card.cardmarket?.prices && (
            <div className="bg-white p-3 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] relative">
              <div className="absolute -right-2 top-4 w-4 h-6 bg-wintergreen border border-black-coral shadow-sm -rotate-12"></div>
              <div className="text-xs text-rhythm-blue mb-1 flex justify-between items-center font-bold px-2 uppercase border-b-2 border-dashed border-black-coral/20 pb-1">
                Cardmarket
                <span className="text-[10px] bg-creamy-almond border border-black-coral px-2 rounded-full text-super-dark">{card.cardmarket.updatedAt}</span>
              </div>
              <div className="text-sm flex justify-between items-center pt-1 px-2 font-black">
                <span className="text-super-dark">Average Sell</span>
                <span className="text-pastel-lavender text-lg">€{card.cardmarket.prices.averageSellPrice?.toFixed(2) || '?'}</span>
              </div>
            </div>
          )}
        </div>

        {/* MARKETPLACE REFERENCES */}
        <div className="mt-4 pt-4 border-t-2 border-dashed border-black-coral/30">
          <div className="font-handdrawn text-xl font-black uppercase text-rhythm-blue mb-2 tracking-widest text-center">Cari Referensi Lain:</div>
          <div className="flex gap-2 justify-center flex-wrap">
            <a href={`https://www.tokopedia.com/search?q=${encodeURIComponent('Pokemon ' + card.name + ' ' + (card.set?.name || ''))}`} target="_blank" rel="noopener noreferrer" className="bg-wintergreen text-super-dark font-handdrawn text-lg font-black px-4 py-1 border-[3px] border-black-coral shadow-[3px_3px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:rotate-2 transition-all rotate-[-3deg] hand-drawn-btn">
              Tokopedia
            </a>
            <a href={`https://shopee.co.id/search?keyword=${encodeURIComponent('Pokemon ' + card.name + ' ' + (card.set?.name || ''))}`} target="_blank" rel="noopener noreferrer" className="bg-mustard text-super-dark font-handdrawn text-lg font-black px-4 py-1 border-[3px] border-black-coral shadow-[3px_3px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:-rotate-1 transition-all rotate-[2deg] hand-drawn-btn">
              Shopee
            </a>
            <a href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent('Pokemon ' + card.name)}`} target="_blank" rel="noopener noreferrer" className="bg-pastel-lavender text-super-dark font-handdrawn text-lg font-black px-4 py-1 border-[3px] border-black-coral shadow-[3px_3px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:rotate-3 transition-all rotate-[-1deg] hand-drawn-btn">
              eBay
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function PricingPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const unwrappedParams = use(searchParams);
  const initialQ = unwrappedParams.q || '';
  
  const [query, setQuery] = useState(initialQ);
  const [search, setSearch] = useState(initialQ);
  const { t } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ['pricing', search],
    queryFn: () => getCardPrices(search),
    enabled: !!search,
  });

  return (
    <div className="page-container">
      <h1 className="page-title font-handdrawn text-7xl mb-4">{t('pricing_title')}</h1>
      <p className="page-desc font-black">{t('pricing_subtitle')}</p>

      <form 
        onSubmit={e => { e.preventDefault(); setSearch(query); }}
        className="glass-input-wrapper max-w-xl mb-12 flex bg-white border-4 border-black-coral rounded-[2rem] shadow-[8px_8px_0_var(--color-black-coral)] items-center p-2 focus-within:-translate-y-1 focus-within:shadow-[10px_10px_0_var(--color-black-coral)] transition-all hand-drawn rotate-1 hover:rotate-0 mx-auto"
      >
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Charizard, Pikachu, swsh1-1..."
          className="flex-1 bg-transparent px-4 py-3 outline-none text-super-dark font-black placeholder-rhythm-blue ml-2"
        />
        <button type="submit" className="bg-pastel-pink hover:bg-pastel-lavender text-white font-black p-3 px-6 rounded-full transition-transform active:scale-95 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] mx-1">
          {t('search_btn')}
        </button>
      </form>

      {isLoading && (
        <div className="flex gap-4 flex-wrap justify-center">
          {[...Array(6)].map((_, i) => <div key={i} className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(33%-1rem)] h-64 skeleton-card hand-drawn" />)}
        </div>
      )}

      {error && <div className="text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-900/50">Error fetching prices: {error.message}</div>}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {data?.data?.map((card: any, index: number) => (
          <PricingCard key={card.id} card={card} isEven={index % 2 === 0} />
        ))}
        {data?.data?.length === 0 && (
          <div className="p-12 text-center text-super-dark font-black tracking-widest text-2xl border-4 border-dashed border-black-coral bg-white col-span-full shadow-lg rotate-1">
            {t('not_found')}
          </div>
        )}
      </motion.div>
    </div>
  );
}
