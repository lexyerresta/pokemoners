'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function TcgCardItem({ card }: { card: any }) {
  const [imgSrc, setImgSrc] = useState(card.image ? `${card.image}/high.webp` : '/card-back.png');

  // Pseudo-random rotation based on ID string length
  const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[3deg]', 'rotate-[-1deg]'];
  const rotateClass = rotations[card.id.length % 4];
  
  const decorations = ['tape', 'pin', 'clip'];
  const decType = decorations[card.name.length % 3];

  return (
    <Link href={`/cards/${card.id}`} className={`group relative block bg-dutch-white border-[3px] border-black-coral p-3 hover:-translate-y-2 hover:scale-105 transition-all shadow-[6px_6px_0_var(--color-black-coral)] hover:shadow-[4px_4px_0_var(--color-pastel-pink)] ${rotateClass} hand-drawn hover-wiggle`}>
      
      {/* Dynamic Binder Decorations */}
      {decType === 'tape' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pastel-pink/90 border-2 border-dashed border-black-coral/20 backdrop-blur-xs z-20 shadow-sm rotate-[-3deg] opacity-90 group-hover:bg-pastel-lavender transition-colors hand-drawn"></div>}
      {decType === 'pin' && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[2rem] z-20 drop-shadow-sm group-hover:-translate-y-1 transition-transform">📍</div>}
      {decType === 'clip' && <div className="absolute -top-6 right-2 text-[2.5rem] z-20 drop-shadow-sm rotate-[15deg] group-hover:-translate-y-1 group-hover:rotate-[20deg] transition-transform">📎</div>}

      <div className="aspect-[2.5/3.5] relative w-full mb-4 border-2 border-black-coral bg-creamy-almond overflow-hidden flex flex-col justify-center hand-drawn-alt">
        <Image 
          src={imgSrc} 
          alt={card.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500 filter sepia-[0.1] contrast-[1.05]"
          sizes="(max-width: 768px) 50vw, 20vw" 
          onError={() => setImgSrc('/card-back.png')}
        />
        {imgSrc === '/card-back.png' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dutch-white/90 backdrop-blur-sm z-10 p-4 text-center">
            <span className="text-terracotta text-xl font-handdrawn font-black border-[3px] border-terracotta px-3 py-1 bg-white shadow-[2px_2px_0_var(--color-terracotta)] -rotate-6">Kartu Gagal <br/> Diload</span>
          </div>
        )}
      </div>
      <h2 className="text-sm font-black truncate text-super-dark group-hover:text-pastel-pink uppercase tracking-widest leading-none mb-1 border-b-2 border-dashed border-black-coral/30 pb-2">{card.name || 'TIDAK DIKETAHUI'}</h2>
      <p className="text-xs text-rhythm-blue font-bold tracking-widest mt-2">{card.id}</p>
    </Link>
  );
}
