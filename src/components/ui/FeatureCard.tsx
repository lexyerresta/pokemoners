import Link from 'next/link';

import { ReactNode } from 'react';

export default function FeatureCard({ title, desc, href, icon }: { title: string, desc: string, href: string, icon: ReactNode }) {
  return (
    <Link href={href} className="group p-8 bg-white border-4 border-black-coral shadow-[8px_8px_0px_var(--color-black-coral)] hover:shadow-[4px_4px_0px_var(--color-pastel-pink)] hover:translate-x-1 hover:translate-y-1 block text-left transition-all hover:rotate-1 hand-drawn relative">
      <div className="absolute top-4 right-4 text-4xl mb-4 group-hover:scale-125 transition-transform">{icon}</div>
      <h3 className="text-3xl font-black text-super-dark mb-4 group-hover:text-pastel-lavender font-handdrawn uppercase tracking-wide">{title}</h3>
      <p className="text-rhythm-blue font-bold text-base leading-relaxed p-4 border-2 border-dashed border-black-coral/20 bg-dutch-white/30 hand-drawn-btn">{desc}</p>
    </Link>
  );
}
