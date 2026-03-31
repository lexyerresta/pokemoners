'use client';
import { useQuery } from '@tanstack/react-query';
import { getTcgCards, searchTcgCards } from '@/lib/tcgApi';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import TcgCardItem from '@/components/ui/TcgCardItem';
import { motion } from 'framer-motion';

export default function CardsList({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const unwrapped = use(searchParams);
  const q = unwrapped.q || '';
  const pageFromUrl = parseInt(unwrapped.page || '1', 10);
  
  const [page, setPage] = useState(pageFromUrl);
  const [displayCards, setDisplayCards] = useState<any[]>([]);
  const [isAppending, setIsAppending] = useState(false);
  const router = useRouter();
  
  const [searchInput, setSearchInput] = useState(q);
  const { t } = useLanguage();

  // Sync internal page state with URL page
  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);
  
  // Sync local input when URL query changes
  useEffect(() => {
    setSearchInput(q);
    setPage(1); // Reset page when query changes
    setDisplayCards([]); // Clear cards to trigger fresh load
    setIsAppending(false);
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/cards?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push(`/cards`);
    }
  };
  
  const { data: searchData, isLoading: loadingSearch, isFetching: fetchingSearch } = useQuery({
    queryKey: ['searchTcg', q, page],
    queryFn: () => searchTcgCards(q, page),
    enabled: !!q,
  });

  const { data: browseData, isLoading: loadingBrowse, isFetching: fetchingBrowse } = useQuery({
    queryKey: ['browseTcg', page],
    queryFn: () => getTcgCards(page, 20),
    enabled: !q,
  });

  const isLoading = (!!q ? loadingSearch : loadingBrowse) && displayCards.length === 0;
  const isFetching = !!q ? fetchingSearch : fetchingBrowse;
  const pageData = !!q ? searchData : browseData;
  const total = pageData?.total || 0;
  const totalPages = Math.ceil(total / 20);

  useEffect(() => {
    if (pageData?.data) {
      if (isAppending) {
        setDisplayCards(prev => {
          const ids = new Set(prev.map(c => c.id));
          const newItems = pageData.data.filter((c: any) => !ids.has(c.id));
          return [...prev, ...newItems];
        });
        setIsAppending(false);
      } else {
        setDisplayCards(pageData.data);
      }
    }
  }, [pageData, isAppending]);

  const loadMore = () => {
    if (page < totalPages) {
      setIsAppending(true);
      router.push(`/cards?q=${encodeURIComponent(q)}&page=${page + 1}`, { scroll: false });
    }
  };

  const goToPage = (p: number) => {
    setIsAppending(false);
    setDisplayCards([]); // Clear for fresh feel on explicit jump
    router.push(`/cards?q=${encodeURIComponent(q)}&page=${p}`);
  };

  // Pagination logic
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
      <div className="flex flex-wrap justify-center gap-2 mt-8 mb-4">
        {pages.map((p, i) => (
          typeof p === 'number' ? (
            <button
              key={i}
              onClick={() => goToPage(p)}
              className={`w-12 h-12 flex items-center justify-center font-black border-[3px] border-black-coral shadow-[3px_3px_0_var(--color-black-coral)] transition-all hand-drawn ${page === p ? 'bg-pastel-pink text-white -translate-y-1' : 'bg-white text-super-dark hover:bg-creamy-almond'}`}
            >
              {p}
            </button>
          ) : (
            <span key={i} className="px-2 self-end font-black text-rhythm-blue">...</span>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <h1 className="page-title font-handdrawn text-5xl md:text-7xl mb-0">
          {q ? `${t('search_results')} "${q}"` : t('card_wiki')}
        </h1>
        {total > 0 && (
          <div className="bg-mustard border-[3px] border-black-coral px-4 py-2 font-black text-super-dark shadow-[4px_4px_0_var(--color-black-coral)] rotate-1 hand-drawn whitespace-nowrap">
            {total} {t('total_cards_available')} | {t('page')} {page} / {totalPages}
          </div>
        )}
      </div>

      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-dutch-white p-4 border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn z-10 relative">
        <form onSubmit={handleSearch} className="flex flex-1 w-full gap-3">
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 bg-white border-[3px] border-black-coral px-5 py-3 font-black text-super-dark placeholder-rhythm-blue outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0_var(--color-pastel-pink)] hand-drawn-alt transition-all"
          />
          <button type="submit" className="bg-mustard hover:bg-terracotta border-[3px] border-black-coral px-6 py-3 font-black text-super-dark transition-colors hand-drawn hover:scale-105 active:scale-95 shadow-[3px_3px_0_var(--color-black-coral)]">
            {t('search_btn')}
          </button>
        </form>
        {q && (
          <button onClick={() => { setSearchInput(''); router.push('/cards'); }} className="bg-pastel-pink hover:bg-pastel-lavender border-[3px] border-black-coral px-6 py-3 font-black text-white hover:text-super-dark transition-all hand-drawn hover:-rotate-3 shadow-[3px_3px_0_var(--color-black-coral)]">
             ✖
          </button>
        )}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(20)].map((_, i) => <div key={i} className={`skeleton-card hand-drawn ${i%2===0?'rotate-1':'-rotate-1'}`} />)}
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
            initial="hidden"
            animate="visible"
            key={`${q}-${displayCards.length === 20 ? 'reset' : 'append'}`} // Trigger animation when reset
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 }
              }
            } }
          >
            {displayCards.map((c: any) => (
              <motion.div key={c.id} variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}>
                <TcgCardItem card={c} />
              </motion.div>
            ))}
            {displayCards.length === 0 && !isLoading && (
              <div className="col-span-full text-center text-super-dark py-24 font-handdrawn font-black text-4xl transform -rotate-2">"{q}" {t('not_found')}</div>
            )}
          </motion.div>

          <div className="mt-12 mb-8 flex flex-col items-center gap-8">
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
        </>
      )}
    </div>
  );
}
