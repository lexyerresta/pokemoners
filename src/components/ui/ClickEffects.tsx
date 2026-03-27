'use client';
import { useEffect, useState } from 'react';

export default function ClickEffects() {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const emojis = ['✨', '💥', '⭐', '✏️', '📍', '💡', '🎵'];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if they are clicking on a form input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const newClick = { 
        id: Date.now(), 
        x: e.clientX, 
        y: e.clientY,
        emoji: randomEmoji
      };
      
      setClicks(prev => [...prev.slice(-15), newClick]);
      
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {clicks.map(c => (
        <div 
          key={c.id} 
          className="absolute animate-wiggle-fade opacity-0 fill-mode-forwards text-3xl drop-shadow-[2px_2px_0_var(--color-black-coral)]"
          style={{ 
            left: c.x - 15, 
            top: c.y - 15,
            animationDuration: '0.8s',
            animationTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {c.emoji}
        </div>
      ))}
    </div>
  );
}
