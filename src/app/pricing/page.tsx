'use client';
import { useState, use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCardPrices } from '@/lib/tcgApi';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

import { getDecorationType } from '@/lib/utils';
import { FALLBACK_IMAGES } from '@/lib/constants';

import { PinIcon, PaperclipIcon } from '@/components/ui/CustomIcons';

import { useRouter, usePathname } from 'next/navigation';

function PricingCard({ card, isEven }: { card: any, isEven: boolean }) {
  const { t } = useLanguage();
  const decType = getDecorationType(card.name);
  const OFFICIAL_BACK = '/images/card-back.png';
  
  const [imgSrc, setImgSrc] = useState(card.images?.small || OFFICIAL_BACK);

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={`bg-${isEven ? 'dutch-white' : 'creamy-almond'} border-[3px] border-black-coral p-6 flex gap-6 hover:shadow-[10px_10px_0_var(--color-pastel-pink)] shadow-[8px_8px_0_var(--color-black-coral)] transition-all hover:-translate-y-2 hover:-translate-x-1 hover:-rotate-1 hand-drawn relative z-10 hover-wiggle`}>
      {/* Dynamic Decorations */}
      {decType === 'tape' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-pastel-pink/90 border-2 border-dashed border-black-coral/20 backdrop-blur-xs z-20 shadow-sm rotate-[-3deg] opacity-90 hand-drawn"></div>}
      {decType === 'pin' && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 drop-shadow-sm group-hover:-translate-y-1 transition-transform inline-flex"><PinIcon size={40} /></div>}
      {decType === 'clip' && <div className="absolute -top-6 right-2 z-20 drop-shadow-sm rotate-[15deg] group-hover:-translate-y-1 group-hover:rotate-[20deg] transition-transform inline-flex"><PaperclipIcon size={48} className="text-rhythm-blue" /></div>}
      
      {/* Image Polaroid Frame */}
      <div className={`w-1/3 flex-shrink-0 bg-white border-2 border-black-coral p-2 pb-6 shadow-[2px_2px_0_var(--color-black-coral)] ${isEven ? 'rotate-2' : '-rotate-2'} `}>
         <div className="relative w-full aspect-[2.5/3.5] border-2 border-black-coral overflow-hidden bg-creamy-linen flex items-center justify-center">
           {/* Spinner/Fallback Background */}
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <svg className="w-12 h-12 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
           </div>
           <Image 
             src={imgSrc} 
             alt={card.name} 
             fill
             className={`object-cover ${imgSrc !== OFFICIAL_BACK ? 'filter sepia-[0.1]' : ''}`}
             onError={() => setImgSrc(OFFICIAL_BACK)}
           />
           {imgSrc === OFFICIAL_BACK && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[1px] z-10 p-2 text-center pointer-events-none text-white overflow-hidden">
                <span className="text-[8px] font-black border-[2px] border-white px-1.5 py-0.5 bg-terracotta shadow-[2px_2px_0_var(--color-black-coral)] rotate-[-10deg] leading-tight flex items-center justify-center min-h-[24px] uppercase">Gagal Load</span>
              </div>
            )}
         </div>
         <div className="text-center mt-2 text-xs text-super-dark font-black tracking-widest">{card.id}</div>
      </div>
      
      <div className="w-2/3 flex flex-col justify-between py-2">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-super-dark mb-1 leading-tight uppercase tracking-widest truncate" title={card.name}>{card.name || t('not_found')}</h2>
          {card.set?.name && <div className="inline-block bg-pastel-lavender/50 border-2 border-dashed border-black-coral px-3 py-1 font-bold text-sm text-super-dark transform -rotate-1 truncate max-w-full">{card.set.name}</div>}
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
                      <span className="capitalize text-super-dark font-handdrawn text-lg">{variant}</span>
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
          <div className="font-handdrawn text-lg font-black uppercase text-rhythm-blue mb-2 tracking-widest text-center">Beli:</div>
          <div className="flex gap-2 justify-center flex-wrap">
            <a href={`https://www.tokopedia.com/search?q=${encodeURIComponent('Pokemon ' + card.name + ' ' + (card.set?.name || ''))}`} target="_blank" rel="noopener noreferrer" className="bg-wintergreen text-super-dark font-handdrawn text-base font-black px-3 py-1 border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:rotate-2 transition-all rotate-[-3deg] hand-drawn-btn">
              Toko
            </a>
            <a href={`https://shopee.co.id/search?keyword=${encodeURIComponent('Pokemon ' + card.name + ' ' + (card.set?.name || ''))}`} target="_blank" rel="noopener noreferrer" className="bg-mustard text-super-dark font-handdrawn text-base font-black px-3 py-1 border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:-rotate-1 transition-all rotate-[2deg] hand-drawn-btn">
              Shopee
            </a>
            <a href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent('Pokemon ' + card.name)}`} target="_blank" rel="noopener noreferrer" className="bg-pastel-lavender text-super-dark font-handdrawn text-base font-black px-3 py-1 border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] hover:rotate-3 transition-all rotate-[-1deg] hand-drawn-btn">
              eBay
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function PricingPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const unwrappedParams = use(searchParams);
  const initialQ = unwrappedParams.q || '';
  const initialPage = parseInt(unwrappedParams.page || '1', 10);
  
  const [query, setQuery] = useState(initialQ);
  const [search, setSearch] = useState(initialQ);
  const [page, setPage] = useState(initialPage);
  const [displayCards, setDisplayCards] = useState<any[]>([]);
  const [isAppending, setIsAppending] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  // Sync internal states with URL
  useEffect(() => {
    setSearch(initialQ);
    setQuery(initialQ);
    setPage(initialPage);
  }, [initialQ, initialPage]);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['pricing', search, page],
    queryFn: () => getCardPrices(search, page),
    enabled: !!search,
  });

  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 21);

  // Sync and handle Load More
  useEffect(() => {
    if (data?.data) {
      if (isAppending) {
        setDisplayCards(prev => {
          const ids = new Set(prev.map(c => c.id));
          const newItems = data.data.filter((c: any) => !ids.has(c.id));
          return [...prev, ...newItems];
        });
        setIsAppending(false);
      } else {
        setDisplayCards(data.data);
      }
    }
  }, [data, isAppending]);

  const loadMore = () => {
    if (page < totalPages) {
      setIsAppending(true);
      router.push(`/pricing?q=${encodeURIComponent(search)}&page=${page + 1}`, { scroll: false });
    }
  };

  const goToPage = (p: number) => {
    setIsAppending(false);
    setDisplayCards([]);
    router.push(`/pricing?q=${encodeURIComponent(search)}&page=${p}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/pricing?q=${encodeURIComponent(query)}&page=1`);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    
    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (end < totalPages) pages.push(totalPages);

    return (
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {pages.map((p, i) => (
          typeof p === 'number' ? (
            <button
              key={i}
              onClick={() => goToPage(p)}
              className={`w-10 h-10 flex items-center justify-center font-black border-[3px] border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] transition-all hand-drawn ${page === p ? 'bg-pastel-pink text-white -translate-y-1' : 'bg-white text-super-dark hover:bg-creamy-almond'}`}
            >
              {p}
            </button>
          ) : (
            <span key={i} className="px-1 self-end font-black text-rhythm-blue">...</span>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title font-handdrawn text-5xl md:text-7xl mb-4">{t('pricing_title')}</h1>
      <p className="page-desc font-black">{t('pricing_subtitle')}</p>

      <form 
        onSubmit={handleSearch}
        className="glass-input-wrapper max-w-xl mb-6 flex bg-white border-4 border-black-coral rounded-[2rem] shadow-[8px_8px_0_var(--color-black-coral)] items-center p-2 focus-within:-translate-y-1 focus-within:shadow-[10px_10px_0_var(--color-black-coral)] transition-all hand-drawn rotate-1 hover:rotate-0 mx-auto"
      >
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          className="flex-1 bg-transparent px-2 md:px-4 py-2 md:py-3 outline-none text-super-dark font-black placeholder-rhythm-blue ml-2 text-sm md:text-base"
        />
        <button type="submit" className="bg-pastel-pink hover:bg-pastel-lavender text-white font-black p-2 md:p-3 px-4 md:px-6 rounded-full transition-transform active:scale-95 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0_var(--color-black-coral)] mx-1 text-sm md:text-base">
          {t('search_btn')}
        </button>
      </form>

      {total > 0 && (
        <div className="text-center mb-8">
           <span className="inline-block bg-creamy-almond border-2 border-black-coral px-4 py-1 font-black text-super-dark hand-drawn rotate-[-1deg]">
              {total} {t('total_cards_available')} | {t('page')} {page} / {totalPages}
           </span>
        </div>
      )}

      {isLoading && displayCards.length === 0 && (
        <div className="flex gap-4 flex-wrap justify-center">
          {[...Array(6)].map((_, i) => <div key={i} className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(33%-1rem)] h-64 skeleton-card hand-drawn" />)}
        </div>
      )}

      {error && <div className="text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-900/50">Error fetching prices: {error.message}</div>}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        key={`${search}-${displayCards.length === 21 ? 'reset' : 'append'}`}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {displayCards.map((card: any, index: number) => (
          <PricingCard key={card.id} card={card} isEven={index % 2 === 0} />
        ))}
        {displayCards.length === 0 && !isLoading && search && (
          <div className="p-12 text-center text-super-dark font-black tracking-widest text-2xl border-4 border-dashed border-black-coral bg-white col-span-full shadow-lg rotate-1">
            {t('not_found')}
          </div>
        )}
      </motion.div>

      <div className="mt-16 mb-12 flex flex-col items-center gap-8">
        {page < totalPages && (
          <button 
            onClick={loadMore}
            disabled={isFetching}
            className="btn-primary hand-drawn-btn text-2xl px-12 py-4 bg-terracotta text-white hover:bg-mustard hover:text-super-dark disabled:opacity-70"
          >
            {isFetching ? '...' : t('load_more')}
          </button>
        )}
        
        {renderPagination()}
      </div>
    </div>
  );
}
