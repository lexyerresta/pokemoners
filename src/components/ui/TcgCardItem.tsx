'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getCardRotation, getDecorationType } from '@/lib/utils';

export default function TcgCardItem({ card }: { card: any }) {
  const OFFICIAL_BACK = '/images/card-back.png';
  const [imgSrc, setImgSrc] = useState(card.image ? `${card.image}/high.webp` : OFFICIAL_BACK);

  const rotateClass = getCardRotation(card.id);
  const decType = getDecorationType(card.name);

  return (
    <Link href={`/cards/${card.id}`} className={`group relative block bg-dutch-white border-[3px] border-black-coral p-3 hover:-translate-y-2 hover:scale-105 transition-all shadow-[6px_6px_0_var(--color-black-coral)] hover:shadow-[4px_4px_0_var(--color-pastel-pink)] ${rotateClass} hand-drawn hover-wiggle`}>
      
      {/* Dynamic Binder Decorations */}
      {decType === 'tape' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pastel-pink/90 border-2 border-dashed border-black-coral/20 backdrop-blur-xs z-20 shadow-sm rotate-[-3deg] opacity-90 group-hover:bg-pastel-lavender transition-colors hand-drawn"></div>}
      {decType === 'pin' && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[2rem] z-20 drop-shadow-sm group-hover:-translate-y-1 transition-transform">📍</div>}
      {decType === 'clip' && <div className="absolute -top-6 right-2 text-[2.5rem] z-20 drop-shadow-sm rotate-[15deg] group-hover:-translate-y-1 group-hover:rotate-[20deg] transition-transform">📎</div>}

      <div className="aspect-[2.5/3.5] relative w-full mb-4 border-2 border-black-coral bg-creamy-almond overflow-hidden flex flex-col justify-center items-center hand-drawn-alt">
        {/* Spinner/Fallback Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
           <svg className="w-16 h-16 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
        </div>

        <Image 
          src={imgSrc} 
          alt={card.name || 'Pokemon Card'} 
          fill 
          className={`object-cover group-hover:scale-110 transition-transform duration-500 ${imgSrc === OFFICIAL_BACK ? '' : 'filter sepia-[0.1] contrast-[1.05]'}`}
          sizes="(max-width: 768px) 50vw, 20vw" 
          onError={() => setImgSrc(OFFICIAL_BACK)}
        />
        {imgSrc === OFFICIAL_BACK && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[1px] z-10 p-4 text-center">
            <span className="text-white text-[10px] font-black border-[2px] border-white px-2 py-1 bg-terracotta/90 shadow-[2px_2px_0_var(--color-black-coral)] -rotate-3 uppercase tracking-tighter">Gagal Load</span>
          </div>
        )}
      </div>
      <h2 className="text-sm font-black truncate text-super-dark group-hover:text-pastel-pink uppercase tracking-widest leading-none mb-1 border-b-2 border-dashed border-black-coral/30 pb-2">{card.name || 'TIDAK DIKETAHUI'}</h2>
      <p className="text-xs text-rhythm-blue font-bold tracking-widest mt-2">{card.id}</p>
    </Link>
  );
}
