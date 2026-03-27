'use client';

import { useRef, useEffect, useState } from 'react';

export default function GlobalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      // Save current drawing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx?.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#2E3532'; // black-coral
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.6; // Slightly semi-transparent for that pencil feel
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      // Don't start drawing if clicking on interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('select') ||
        target.closest('.hand-drawn-btn') ||
        target.closest('nav');

      if (isInteractive) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      ctx.beginPath();
      ctx.moveTo(clientX, clientY);
      setIsDrawing(true);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      ctx.lineTo(clientX, clientY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    window.addEventListener('mousedown', startDrawing);
    window.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);
    window.addEventListener('touchstart', startDrawing);
    window.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDrawing);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', startDrawing);
      window.removeEventListener('mousemove', draw);
      window.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('touchstart', startDrawing);
      window.removeEventListener('touchmove', draw);
      window.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ touchAction: 'none' }}
    />
  );
}
