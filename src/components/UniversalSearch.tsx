'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UniversalSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/cards?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-10 relative px-4 md:px-0">
      {/* Decorative Washi Tape */}
      <div className="absolute -top-3 left-10 w-20 h-6 bg-pastel-pink/70 border-2 border-black-coral -rotate-3 z-10 shadow-sm hidden md:block"></div>
      
      <div className="flex bg-white border-4 border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] md:shadow-[8px_8px_0_var(--color-black-coral)] items-center p-1.5 md:p-2 focus-within:-translate-y-1 focus-within:shadow-[10px_10px_0_var(--color-black-coral)] transition-all md:rotate-1 hover:rotate-0 hand-drawn overflow-hidden">
        <input 
          type="text" 
          placeholder={t('search_placeholder')} 
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-4 md:px-6 py-3 md:py-4 bg-transparent outline-none flex-1 text-super-dark font-black placeholder-rhythm-blue text-base md:text-lg w-full"
        />
        <button type="submit" className="bg-mustard hover:bg-terracotta text-super-dark hover:text-white p-2.5 md:p-4 transition-all active:scale-95 border-[3px] border-black-coral shadow-[3px_3px_0_var(--color-black-coral)] md:shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[2px_2px_0_var(--color-black-coral)] mx-1 rotate-[-5deg] hand-drawn-btn flex-shrink-0">
          <Search size={22} className="md:w-6 md:h-6 font-black" strokeWidth={3} />
        </button>
      </div>
    </form>
  );
}
