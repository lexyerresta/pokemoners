'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORT_LINKS } from '@/lib/constants';
import { SaweriaIcon, TrakteerIcon, HeartIcon } from './CustomIcons';

export default function FloatingSupport() {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-6 right-4 z-50 group">
      <button className="flex items-center gap-2 bg-white px-4 py-3 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-black-coral)] hover:translate-y-px transition-all hand-drawn-btn transform rotate-[-3deg] hover:rotate-1 z-20 relative">
        <span className="font-handdrawn font-black uppercase text-sm text-super-dark pt-1 tracking-wider">{t('support_us')}</span>
        <HeartIcon className="text-pastel-pink animate-pulse" size={24} />
      </button>
      {/* Dropdown Menu (upwards) */}
      <div className="absolute right-0 bottom-full mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 w-48 origin-bottom-right">
        <div className="bg-creamy-linen border-[3px] border-black-coral shadow-[6px_6px_0_var(--color-black-coral)] p-3 flex flex-col gap-3 hand-drawn-alt rotate-2">
          <a href={SUPPORT_LINKS.SAWERIA} target="_blank" rel="noopener noreferrer" className="bg-pastel-pink text-white font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] active:bg-terracotta transition-colors hand-drawn-btn active:-translate-y-px active:-rotate-2 rotate-1 text-center text-sm flex items-center justify-center gap-2">
            <SaweriaIcon size={20} className="text-white" /> Saweria
          </a>
          <a href={SUPPORT_LINKS.TRAKTEER} target="_blank" rel="noopener noreferrer" className="bg-[#BE1E2D] text-white font-black px-4 py-2 border-2 border-black-coral shadow-[2px_2px_0_var(--color-black-coral)] active:bg-[#8B151F] transition-colors hand-drawn-btn active:-translate-y-px active:rotate-2 -rotate-1 text-center text-sm flex items-center justify-center gap-2">
            <TrakteerIcon size={20} className="text-white" /> Trakteer
          </a>
        </div>
      </div>
    </div>
  );
}
