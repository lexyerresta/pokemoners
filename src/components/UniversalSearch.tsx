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
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-10 relative">
      {/* Decorative Washi Tape */}
      <div className="absolute -top-3 left-10 w-20 h-6 bg-pastel-pink/70 border-2 border-black-coral -rotate-3 z-10 shadow-sm"></div>
      
      <div className="flex bg-white border-4 border-black-coral shadow-[8px_8px_0_var(--color-black-coral)] items-center p-2 focus-within:-translate-y-1 focus-within:shadow-[10px_10px_0_var(--color-black-coral)] transition-all rotate-1 hover:rotate-0 hand-drawn">
        <input 
          type="text" 
          placeholder={t('search_placeholder')} 
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-6 py-4 bg-transparent outline-none flex-1 text-super-dark font-black placeholder-rhythm-blue text-lg"
        />
        <button type="submit" className="bg-mustard hover:bg-terracotta text-super-dark hover:text-white p-4 transition-all active:scale-95 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[2px_2px_0_var(--color-black-coral)] mx-1 rotate-[-5deg] hand-drawn-btn">
          <Search size={24} className="font-black" strokeWidth={3} />
        </button>
      </div>
    </form>
  );
}
