'use client';
import { useEffect, useState } from 'react';
import { HeartIcon, StarIcon, PokeballIcon, DoodleStar, PencilIcon } from './CustomIcons';

const ICON_COMPONENTS = [
  (props: any) => <HeartIcon {...props} className="text-pastel-pink" />,
  (props: any) => <StarIcon {...props} className="text-mustard" />,
  (props: any) => <PokeballIcon {...props} />,
  (props: any) => <DoodleStar {...props} className="text-pastel-lavender" />,
  (props: any) => <PencilIcon {...props} className="text-rhythm-blue" />,
];

export default function ClickEffects() {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number; index: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const randomIdx = Math.floor(Math.random() * ICON_COMPONENTS.length);
      const newClick = { 
        id: Date.now(), 
        x: e.clientX, 
        y: e.clientY,
        index: randomIdx
      };
      
      setClicks(prev => [...prev.slice(-15), newClick]);
      
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {clicks.map(c => {
        const IconComponent = ICON_COMPONENTS[c.index];
        return (
          <div 
            key={c.id} 
            className="absolute animate-wiggle-fade opacity-0 fill-mode-forwards drop-shadow-[2px_2px_0_var(--color-black-coral)]"
            style={{ 
              left: c.x - 20, 
              top: c.y - 20,
              animationDuration: '1s',
              animationTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <IconComponent size={40} />
          </div>
        );
      })}
    </div>
  );
}
