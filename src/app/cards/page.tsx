'use client';
import { useQuery } from '@tanstack/react-query';
import { getTcgCards, searchTcgCards } from '@/lib/tcgApi';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import TcgCardItem from '@/components/ui/TcgCardItem';
import { motion } from 'framer-motion';

export default function CardsList({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const unwrapped = use(searchParams);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const q = unwrapped.q || '';
  const [searchInput, setSearchInput] = useState(q);
  const { t } = useLanguage();
  
  // Sync local input when URL query changes
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/cards?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push(`/cards`);
    }
  };
  
  const { data: searchData, isLoading: loadingSearch } = useQuery({
    queryKey: ['searchTcg', q],
    queryFn: () => searchTcgCards(q),
    enabled: !!q,
  });

  const { data: browseData, isLoading: loadingBrowse } = useQuery({
    queryKey: ['browseTcg', page],
    queryFn: () => getTcgCards(page, 20),
    enabled: !q,
  });

  const isLoading = !!q ? loadingSearch : loadingBrowse;
  const cards = !!q ? searchData : browseData?.data;

  return (
    <div className="page-container">
      <h1 className="page-title font-handdrawn text-7xl mb-6">
        {q ? `${t('search_results')} "${q}"` : t('card_wiki')}
      </h1>

      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-dutch-white p-4 border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn z-10 relative">
        <form onSubmit={handleSearch} className="flex flex-1 w-full gap-3">
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Ketik nama kartu untuk filter..."
            className="flex-1 bg-white border-[3px] border-black-coral px-5 py-3 font-black text-super-dark placeholder-rhythm-blue outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0_var(--color-pastel-pink)] hand-drawn-alt transition-all"
          />
          <button type="submit" className="bg-mustard hover:bg-terracotta border-[3px] border-black-coral px-6 py-3 font-black text-super-dark transition-colors hand-drawn hover:scale-105 active:scale-95 shadow-[3px_3px_0_var(--color-black-coral)]">
            Cari
          </button>
        </form>
        {q && (
          <button onClick={() => { setSearchInput(''); router.push('/cards'); }} className="bg-pastel-pink hover:bg-pastel-lavender border-[3px] border-black-coral px-6 py-3 font-black text-white hover:text-super-dark transition-all hand-drawn hover:-rotate-3 shadow-[3px_3px_0_var(--color-black-coral)]">
            Hapus Filter ✖
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
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {cards?.map((c: any) => (
              <motion.div key={c.id} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                <TcgCardItem card={c} />
              </motion.div>
            ))}
            {cards?.length === 0 && (
              <div className="col-span-full text-center text-super-dark py-24 font-handdrawn font-black text-4xl transform -rotate-2">"{q}" {t('not_found')}</div>
            )}
          </motion.div>

          {!q && browseData && (
            <div className="flex justify-center gap-4 mt-12 mb-8 items-center">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
                className="btn-secondary hand-drawn-btn"
              >
                {t('prev')}
              </button>
              <span className="px-4 py-2 font-handdrawn text-2xl font-black bg-white border-2 border-dashed border-black-coral rotate-2 shadow-sm">{t('page')} {page}</span>
              <button 
                onClick={() => setPage(p => p + 1)}
                 className="btn-primary hand-drawn-btn"
              >
                {t('next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
