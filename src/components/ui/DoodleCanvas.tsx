'use client';
import { useRef, useEffect, useState } from 'react';

export default function DoodleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#2E3532'; // black-coral
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Fill with slight paper color just in case
    ctx.fillStyle = '#f8f4eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { 
        offsetX: e.touches[0].clientX - rect.left, 
        offsetY: e.touches[0].clientY - rect.top 
      };
    }
    return { 
      offsetX: (e as React.MouseEvent).nativeEvent.offsetX, 
      offsetY: (e as React.MouseEvent).nativeEvent.offsetY 
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if ('touches' in e) {
      document.body.style.overflow = 'hidden';
    }

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling while touching
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    document.body.style.overflow = 'auto'; // allow scroll again
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Refill background
    ctx.fillStyle = '#f8f4eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative inline-block rotate-2 hand-drawn hover:rotate-1 transition-transform z-20">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pastel-pink border-[3px] border-dashed border-black-coral/30 opacity-90 -rotate-3 z-30 pointer-events-none shadow-sm hand-drawn"></div>
      
      <div className="bg-white border-[4px] border-black-coral p-3 pb-8 hand-drawn-alt shadow-[8px_8px_0_var(--color-black-coral)]">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="font-handdrawn text-3xl font-black text-rhythm-blue uppercase tracking-widest pl-2">Coret di sini!</h3>
          <button 
            onClick={clearCanvas} 
            className="text-xs font-black uppercase tracking-widest bg-dutch-white border-2 border-black-coral px-3 py-1 text-super-dark hover:bg-terracotta hover:text-white transition-all shadow-[2px_2px_0_var(--color-black-coral)] active:translate-y-px active:shadow-none hand-drawn-btn"
          >
            Hapus
          </button>
        </div>
        
        <div className="relative border-[3px] border-black-coral hand-drawn overflow-hidden bg-creamy-linen shadow-inner">
          <canvas
            ref={canvasRef}
            width={340}
            height={240}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none"
          />
        </div>
      </div>
    </div>
  );
}
