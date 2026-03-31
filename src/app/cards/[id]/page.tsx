'use client';
import { useQuery } from '@tanstack/react-query';
import { getTcgCardDetail } from '@/lib/tcgApi';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CardDetail({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useLanguage();
  const unwrappedParams = use(params);
  const { data: c, isLoading } = useQuery({
    queryKey: ['card', unwrappedParams.id],
    queryFn: () => getTcgCardDetail(unwrappedParams.id),
  });

  const [imgSrc, setImgSrc] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState(false);
  const card: any = c;

  useEffect(() => {
    if (card && card.image !== undefined) {
      setImgSrc(card.image ? `${card.image}/high.webp` : FALLBACK_IMAGES.CARD_BACK);
    }
  }, [card]);

  if (isLoading) return <div className="p-12 text-center text-super-dark font-black tracking-widest uppercase animate-pulse">{t('loading')}</div>;
  if (!card) return <div className="p-12 text-center text-terracotta font-black tracking-widest uppercase">{t('not_found')}</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative">
      <Link href="/cards" className="inline-block bg-dutch-white px-5 py-2 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-black-coral)] font-black text-sm uppercase tracking-widest hand-drawn-btn hover:-rotate-2 rotate-1 mb-10 relative z-30">
         🔙 {t('back')}
      </Link>

      <div className="absolute top-20 left-10 w-64 h-64 bg-pastel-pink rounded-full opacity-20 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-wintergreen rounded-full opacity-20 blur-3xl -z-10 animate-pulse delay-700" />
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start transition-all">
        {/* Left: Card Container */}
        <div className="w-full max-w-[340px] lg:w-1/3 flex justify-center perspective-[1500px] mb-8 lg:mb-0">
          {imgSrc && imgSrc !== FALLBACK_IMAGES.CARD_BACK ? (
             <motion.div 
              className="relative w-full aspect-[340/480] md:h-[480px] cursor-pointer group z-20"
              animate={{ rotateY: isFlipped ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front side */}
              <div 
                className="absolute inset-0 bg-white p-2.5 md:p-3 pb-6 md:pb-8 border-4 border-black-coral shadow-[8px_8px_0_var(--color-black-coral)] md:shadow-[12px_12px_0_var(--color-black-coral)] rotate-[-2deg]"
              >
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 md:h-8 bg-pastel-pink/80 border-2 border-black-coral -rotate-6 z-30 shadow-sm" />
                <div className="absolute top-2 right-2 bg-mustard border-2 border-black-coral px-2 rounded-full text-[9px] md:text-[10px] font-black uppercase text-super-dark shadow-[1px_1px_0_var(--color-black-coral)] rotate-12 group-hover:-translate-y-1 transition-transform pointer-events-none">{t('spin')}</div>
                <Image 
                  src={imgSrc}
                  alt={card.name}
                  fill
                  className="object-contain border-2 border-black-coral bg-creamy-almond"
                  onError={() => setImgSrc(FALLBACK_IMAGES.CARD_BACK)}
                />
                
                {/* Holographic Effects based on Rarity */}
                {card.rarity && card.rarity.match(/Secret|Illustration|Hyper|Rainbow/i) && (
                  <div className="holo-rainbow"></div>
                )}
                {card.rarity && card.rarity.match(/Holo|Rare|VMAX|VSTAR|EX|GX/i) && !card.rarity.match(/Secret|Illustration|Hyper|Rainbow/i) && (
                  <div className="holo-mask"></div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="w-full aspect-[340/440] md:h-[440px] bg-dutch-white border-4 border-black-coral shadow-[12px_12px_0_var(--color-black-coral)] rotate-[-2deg] flex flex-col items-center justify-center p-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-terracotta/70 border-2 border-black-coral -rotate-6 z-30 shadow-sm" />
              <span className="text-terracotta text-2xl md:text-4xl font-black font-handdrawn text-center border-[3px] border-terracotta px-4 py-2 rotate-12 bg-white shadow-[4px_4px_0_var(--color-terracotta)]">{t('loading_failed')}</span>
            </div>
          )}
        </div>

        {/* Right: Info Content */}
        <div className="w-full lg:w-2/3 bg-creamy-almond rounded-3xl p-6 md:p-12 border-4 border-black-coral shadow-[8px_8px_0_var(--color-black-coral)] md:shadow-[16px_16px_0_var(--color-black-coral)] relative overflow-hidden rotate-1 z-10 block">
          <div className="absolute -right-6 md:-right-10 -top-6 md:-top-10 opacity-10 pointer-events-none text-7xl md:text-9xl font-black text-pastel-pink rotate-12">TCG</div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start z-10 relative mb-6 border-b-4 border-dashed border-black-coral/20 pb-6 gap-4">
            <div>
              <h1 className="text-4xl md:text-7xl font-black mb-1 text-super-dark tracking-tighter capitalize font-handdrawn leading-[0.9] drop-shadow-sm">{card.name}</h1>
              <div className="bg-mustard border-2 border-black-coral text-super-dark font-black tracking-widest text-[10px] md:text-sm px-4 py-1.5 rounded-full inline-block shadow-[2px_2px_0_var(--color-black-coral)] rotate-[-1deg] mt-2">
                {card.id} &bull; {card.rarity || 'Common'}
              </div>
            </div>
            {card.hp && (
              <div className="text-4xl md:text-5xl font-handdrawn font-black text-terracotta flex items-start gap-1 bg-white border-[3px] border-black-coral p-3 px-5 rounded-2xl shadow-[4px_4px_0_var(--color-pastel-pink)] rotate-6 self-end sm:self-start">
                <span className="text-xs mt-3 uppercase tracking-widest">{t('hp')}</span>{card.hp}
              </div>
            )}
          </div>

          {/* Cek Harga Button */}
          <Link 
            href={`/pricing`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/pricing?q=${encodeURIComponent(card.name + ' ' + (card.set?.name || ''))}`;
            }}
            className="flex items-center justify-center gap-3 bg-pastel-pink text-white font-handdrawn font-black text-xl md:text-3xl w-full py-3 md:py-4 border-[4px] mb-8 border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] md:shadow-[6px_6px_0_var(--color-black-coral)] hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-black-coral)] hand-drawn hover:-rotate-1 rotate-1 transition-all group relative z-10"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 md:w-20 h-5 md:h-6 bg-mustard border-2 border-black-coral rotate-[-8deg] z-20 shadow-sm" />
            <span>{t('check_price_btn')}</span>
            <span className="text-2xl md:text-4xl group-hover:rotate-12 transition-transform">💸</span>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 z-10 relative">
            <div className="bg-white p-4 md:p-5 px-6 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] md:shadow-[6px_6px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn">
              <div className="text-[10px] md:text-sm text-rhythm-blue font-black uppercase tracking-widest mb-1 border-b-[3px] border-black-coral/20 pb-2">{t('set')}</div>
              <div className="font-handdrawn font-black text-super-dark text-3xl md:text-4xl leading-tight mt-2">{card.set?.name} <span className="text-xs font-sans opacity-50 block">{card.set?.id}</span></div>
            </div>
            <div className="bg-white p-4 md:p-5 px-6 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] md:shadow-[6px_6px_0_var(--color-black-coral)] rotate-[2deg] hand-drawn-alt">
              <div className="text-[10px] md:text-sm text-rhythm-blue font-black uppercase tracking-widest mb-1 border-b-[3px] border-black-coral/20 pb-2">{t('category')}</div>
              <div className="font-handdrawn font-black text-super-dark text-3xl md:text-4xl mt-3 capitalize">{card.category}</div>
            </div>
          </div>

          {/* Rules & Abilities Snippets */}
          {(card.abilities || card.rules) && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 z-10 relative">
              {card.rules?.map((rule: string, i: number) => (
                <div key={`rule-${i}`} className="bg-mustard p-4 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] rotate-1 hand-drawn-btn hover-wiggle w-full sm:w-[calc(50%-1rem)] relative group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-pastel-pink/90 border border-black-coral/20 rotate-[-5deg] shadow-sm z-10"></div>
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-super-dark opacity-50 mb-1">{t('rules')}</div>
                  <p className="font-bold text-super-dark leading-snug text-xs md:text-sm">{rule}</p>
                </div>
              ))}
              {card.abilities?.map((ability: any, i: number) => (
                <div key={`ability-${i}`} className="bg-dutch-white p-4 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] rotate-[-1deg] hand-drawn-btn hover-wiggle w-full sm:w-[calc(50%-1rem)] relative group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-pastel-lavender/90 border border-black-coral/20 rotate-[3deg] shadow-sm z-10"></div>
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-super-dark opacity-50 mb-1">{ability.type || 'Ability'} • <span className="text-terracotta">{ability.name}</span></div>
                  <p className="font-bold text-super-dark leading-snug text-xs md:text-sm">{ability.effect}</p>
                </div>
              ))}
            </div>
          )}

          {card.attacks && card.attacks.length > 0 && (
            <div className="z-10 relative mt-4 md:mt-8">
              <h2 className="text-3xl md:text-4xl font-black text-super-dark mb-6 tracking-widest font-handdrawn bg-wintergreen/60 px-4 py-2 inline-block border-[3px] border-black-coral rotate-[-2deg] shadow-[4px_4px_0_var(--color-black-coral)] hand-drawn-btn">{t('attacks')}</h2>
              <div className="space-y-4 md:space-y-6">
                {card.attacks.map((atk: any, idx: number) => (
                   <div key={idx} className="bg-dutch-white px-4 md:px-6 py-4 md:py-5 rounded-2xl border-4 border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] md:shadow-[6px_6px_0_var(--color-black-coral)] hover:-translate-y-1 hover:shadow-[2px_2px_0_var(--color-black-coral)] transition-all relative group">
                    <div className="absolute -left-2 md:-left-3 top-4 w-4 md:w-6 h-10 md:h-12 bg-pastel-pink border-2 border-black-coral -z-10 rounded-l-full shadow-sm group-hover:bg-mustard transition-colors"></div>
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <div className="font-black text-lg md:text-2xl text-super-dark flex gap-2 md:gap-3 items-center">
                        <span className="flex gap-0.5 md:gap-1 shrink-0">
                          {atk.cost?.map((c: string, i: number) => (
                            <span key={i} className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-super-dark text-[8px] md:text-[10px] flex items-center justify-center font-black text-white shadow-[1px_1px_0_var(--color-pastel-pink)]">{c[0]}</span>
                          ))}
                        </span>
                        <span className="uppercase tracking-wide truncate max-w-[120px] sm:max-w-none">{atk.name}</span>
                      </div>
                      <div className="font-black text-2xl md:text-3xl text-terracotta bg-white px-2 md:px-3 py-1 border-2 border-black-coral rounded-xl shadow-[2px_2px_0_var(--color-black-coral)] rotate-3">{atk.damage || '0'}</div>
                    </div>
                    {atk.effect && <p className="text-rhythm-blue font-bold text-xs md:text-sm leading-relaxed bg-white/50 p-2 md:p-3 rounded-xl border-2 border-dashed border-black-coral/30">{atk.effect}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
