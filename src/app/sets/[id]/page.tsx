'use client';
import { useQuery } from '@tanstack/react-query';
import { getTcgSetDetail } from '@/lib/tcgApi';
import { use, useState } from 'react';
import TcgCardItem from '@/components/ui/TcgCardItem';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SetDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrapped = use(params);
  
  const { data: setDetail, isLoading } = useQuery({
    queryKey: ['setDetail', unwrapped.id],
    queryFn: () => getTcgSetDetail(unwrapped.id),
  });

  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <div className="page-container text-center pt-24 font-handdrawn text-5xl animate-pulse">Buka bungkus pack...</div>;
  if (!setDetail || setDetail.error) return <div className="page-container text-center pt-24 font-handdrawn text-5xl text-terracotta hover-wiggle">Pack tidak ditemukan!</div>;

  return (
    <div className="page-container">
      <Link href="/sets" className="inline-block bg-dutch-white px-4 py-2 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-black-coral)] font-black text-xs uppercase tracking-widest hand-drawn-btn hover:-rotate-2 rotate-1 mb-8">
         Kembali ke Etalase
      </Link>

      {/* Set Header Sticky Note */}
      <div className="bg-mustard border-[4px] border-black-coral p-8 mb-12 shadow-[8px_8px_0_var(--color-pastel-pink)] rotate-1 hand-drawn-alt max-w-2xl mx-auto relative group z-10">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-pastel-lavender/90 border-2 border-dashed border-black-coral/30 rotate-[-4deg] shadow-sm z-20 hand-drawn" />
        <div className="absolute -top-6 right-10 text-5xl z-20 drop-shadow-sm rotate-[15deg] group-hover:-translate-y-1 group-hover:rotate-[20deg] transition-transform">📎</div>
        
        {setDetail.logo && (
          <div className="h-32 bg-white/60 border-[3px] border-black-coral/40 p-3 mb-6 flex items-center justify-center hand-drawn shadow-inner hover:-rotate-1 transition-transform">
            <Image src={`${setDetail.logo}.png`} alt={setDetail.name} width={300} height={120} className="object-contain max-h-full drop-shadow-sm" />
          </div>
        )}
        
        <h1 className="font-handdrawn text-6xl font-black text-super-dark text-center leading-none tracking-tight hover-wiggle">{setDetail.name}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="bg-white px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] rotate-[-2deg] hand-drawn-btn">
            <span className="text-[10px] text-rhythm-blue uppercase font-black tracking-widest block mb-1">Seri</span>
            <span className="font-handdrawn text-2xl font-black">{setDetail.serie?.name || '-'}</span>
          </div>
          <div className="bg-white px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] rotate-[3deg] hand-drawn-alt hover-wiggle">
            <span className="text-[10px] text-rhythm-blue uppercase font-black tracking-widest block mb-1">Rilis</span>
            <span className="font-handdrawn text-2xl font-black">{setDetail.releaseDate || '???'}</span>
          </div>
          <div className="bg-white px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn">
            <span className="text-[10px] text-rhythm-blue uppercase font-black tracking-widest block mb-1">Total Kartu</span>
            <span className="font-handdrawn text-2xl font-black">{setDetail.cardCount?.total || 0}</span>
          </div>
        </div>
      </div>

      {/* Cards List Grid */}
      <h2 className="font-handdrawn text-5xl font-black text-center mb-8 z-10 relative bg-pastel-pink/30 inline-block px-8 py-2 border-y-[3px] border-dashed border-black-coral/50 rotate-[-1deg] mx-auto w-full max-w-sm">Isi Pack:</h2>
      
      {/* Search Bar for Cards in Set */}
      <div className="max-w-md mx-auto mb-10 relative z-10">
        <div className="absolute -top-3 -right-2 w-16 h-5 bg-terracotta/70 border-2 border-black-coral/20 rotate-[5deg] z-20 shadow-sm hand-drawn" />
        <div className="flex flex-col bg-white p-2 border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn focus-within:-translate-y-1 focus-within:shadow-[4px_4px_0_var(--color-black-coral)] transition-all">
          <div className="flex items-center px-2 py-1">
            <Search size={24} className="text-rhythm-blue mr-3 drop-shadow-sm" strokeWidth={3} />
            <input
              type="text"
              placeholder="Cari pokemon jenis apa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none font-black text-super-dark placeholder-rhythm-blue/50 text-lg"
            />
          </div>
          {searchQuery && (
            <div className="text-right text-xs font-black uppercase tracking-widest text-terracotta mr-2 border-t-[3px] border-dashed border-black-coral/20 pt-1 mt-1">
              {setDetail.cards?.filter((c: any) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length} Ditemukan
            </div>
          )}
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
      >
        {setDetail.cards?.filter((c: any) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c: any) => (
          <motion.div key={c.id} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
             <TcgCardItem card={c} />
          </motion.div>
        ))}
        {(!setDetail.cards || setDetail.cards.filter((c: any) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
          <div className="col-span-full text-center text-super-dark py-12 font-handdrawn font-black text-4xl transform -rotate-2">Yah Kosong...</div>
        )}
      </motion.div>
    </div>
  );
}
