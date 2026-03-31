'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PokeballIcon, DoodleStar } from './CustomIcons';

export default function PackOpener({ onComplete }: { onComplete: () => void }) {
  const [isRipping, setIsRipping] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Start ripping after 1.2 second to let the user see the pack
    const ripTimer = setTimeout(() => {
      setIsRipping(true);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 200);
    }, 1200);
    
    // Complete after 4 seconds to show cards well
    const completeTimer = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(ripTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Crimped edge pattern
  const CrimpedEdge = () => (
    <div className="flex justify-around w-full h-4 bg-black-coral/20">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="w-[1px] h-full bg-black-coral/30" />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md overflow-hidden p-4">
      {/* Background Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[110] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 600, rotate: 5, scale: 0.8 }}
        animate={{ y: 0, rotate: 0, scale: 1 }}
        exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.5 } }}
        className="relative w-72 h-[480px] md:w-80 md:h-[540px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Top Half of Pack */}
        <motion.div 
          animate={isRipping ? { 
            y: -400, 
            rotate: -25, 
            x: -150,
            opacity: 0,
            transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1] }
          } : {}}
          className="absolute inset-0 z-30 flex flex-col items-center"
        >
          <div className="w-full h-1/2 bg-gradient-to-br from-rhythm-blue via-pastel-lavender to-rhythm-blue border-x-[4px] border-t-[4px] border-black-coral relative flex flex-col items-center justify-between overflow-hidden shadow-inner">
            {/* Metallic Shine */}
            <div className="absolute top-0 left-[-100%] w-[300%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 animate-[shine_3s_infinite]" />
            
            <CrimpedEdge />
            
            <div className="flex-1 flex items-center justify-center relative w-full">
               < PokeballIcon size={140} className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] opacity-95 animate-pulse" />
               <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
            </div>

            {/* Jagged Tear Edge (Top) */}
            <div 
              className="w-[110%] h-8 bg-white absolute bottom-[-4px] left-[-5%]"
              style={{ 
                clipPath: 'polygon(0% 100%, 5% 40%, 10% 80%, 15% 30%, 20% 70%, 25% 20%, 30% 90%, 35% 40%, 40% 80%, 45% 10%, 50% 70%, 55% 30%, 60% 90%, 65% 50%, 70% 80%, 75% 20%, 80% 70%, 85% 40%, 90% 90%, 95% 30%, 100% 100%)' 
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Half of Pack */}
        <motion.div 
           animate={isRipping ? { 
            y: 400, 
            rotate: 25, 
            x: 150,
            opacity: 0,
            transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1] }
          } : {}}
          className="absolute inset-0 z-20 flex flex-col items-center justify-end"
        >
          <div className="w-full h-1/2 bg-gradient-to-tr from-rhythm-blue via-pastel-lavender to-rhythm-blue border-x-[4px] border-b-[4px] border-black-coral relative flex flex-col items-center justify-between overflow-hidden shadow-inner">
             {/* Metallic Shine */}
             <div className="absolute top-0 left-[-100%] w-[300%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 animate-[shine_3s_infinite_reverse]" />

             {/* Jagged Tear Edge (Bottom) */}
             <div 
               className="w-[110%] h-8 bg-black-coral absolute top-[-4px] left-[-5%] overflow-hidden"
               style={{ 
                 clipPath: 'polygon(0% 0%, 5% 60%, 10% 20%, 15% 70%, 20% 30%, 25% 80%, 30% 10%, 35% 60%, 40% 20%, 45% 90%, 50% 30%, 55% 70%, 60% 10%, 65% 50%, 70% 20%, 75% 80%, 80% 30%, 85% 60%, 90% 10%, 95% 70%, 100% 0%)' 
               }}
             >
                <div className="w-full h-2 bg-white/50" />
             </div>

             <div className="flex-1 flex flex-col items-center justify-center p-6 w-full">
                <div className="flex gap-2 mb-2">
                   <DoodleStar size={24} className="text-mustard animate-bounce" />
                   <DoodleStar size={24} className="text-white animate-pulse" />
                   <DoodleStar size={24} className="text-mustard animate-bounce" />
                </div>
                <h2 className="font-handdrawn text-5xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.4)] tracking-tighter uppercase italic select-none">BREWEK!!</h2>
             </div>

             <CrimpedEdge />
          </div>
        </motion.div>

        {/* The "Cards" inside being revealed */}
        <AnimatePresence>
          {isRipping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ rotate: 0, y: 0, x: 0, opacity: 0 }}
                  animate={{ 
                    rotate: (i - 2.5) * 12, 
                    y: Math.abs(i - 2.5) * 15,
                    x: (i - 2.5) * 30,
                    opacity: 1,
                    transition: { delay: 0.4 + (i * 0.08), duration: 0.6, type: 'spring', damping: 12 }
                  }}
                  className="absolute w-44 h-60 bg-white border-[4px] border-black-coral shadow-[8px_8px_0_rgba(0,0,0,0.2)] hand-drawn-alt flex items-center justify-center"
                >
                   {/* Card Content Placeholder */}
                   <div className="w-full h-full p-2 flex flex-col">
                      <div className="w-full h-2/3 bg-creamy-almond border-2 border-black-coral rounded p-1 flex items-center justify-center mb-2">
                         <PokeballIcon className="text-pastel-pink opacity-20" size={80} />
                      </div>
                      <div className="w-3/4 h-3 bg-black-coral/20 mb-1" />
                      <div className="w-1/2 h-3 bg-black-coral/10" />
                   </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative Particles */}
      <AnimatePresence>
        {isRipping && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: "50%", 
                  y: "50%",
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  rotate: Math.random() * 720,
                  scale: Math.random() * 1.2 + 0.3,
                  opacity: 0,
                  transition: { duration: 1.5, ease: "easeOut", delay: 0.1 }
                }}
                className="absolute"
              >
                <div className={`w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-mustard' : i % 3 === 1 ? 'bg-pastel-pink' : 'bg-white'}`} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
