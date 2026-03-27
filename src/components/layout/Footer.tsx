export default function Footer() {
  return (
    <footer className="relative mt-16 mb-12 py-10 border-[4px] border-black-coral text-center text-sm text-super-dark bg-dutch-white shadow-[8px_8px_0_var(--color-black-coral)] z-10 mx-4 max-w-xl self-center w-full hand-drawn">
      <div className="absolute -top-6 left-[10%] w-32 h-10 bg-pastel-pink border-[3px] border-dashed border-black-coral/30 -rotate-3 z-30 opacity-90 shadow-[2px_2px_0_var(--color-black-coral)] hand-drawn"></div>
      <div className="absolute -top-8 right-[15%] w-24 h-12 bg-mustard border-[3px] border-black-coral rotate-6 z-30 opacity-90 shadow-[4px_4px_0_var(--color-black-coral)] hand-drawn-alt"></div>

      <div className="inline-block bg-white px-8 py-6 border-[4px] border-black-coral shadow-[6px_6px_0_var(--color-pastel-lavender)] hand-drawn hover:rotate-1 hover:scale-105 transition-transform group cursor-pointer relative z-20 mx-4">
        <p className="font-black font-handdrawn text-4xl md:text-5xl tracking-widest text-super-dark group-hover:text-rhythm-blue transition-colors">
          Pokemoners
        </p>
        <div className="font-bold text-xs md:text-sm mt-4 uppercase tracking-[0.2em] text-rhythm-blue flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="bg-mustard text-super-dark px-3 py-1 border-[3px] border-black-coral rotate-[-3deg] inline-block shadow-[3px_3px_0_var(--color-black-coral)] hand-drawn-alt">Dari Kolektor</span>
          <span className="mt-1 sm:mt-0">Untuk Kolektor</span>
        </div>
      </div>
    </footer>
  );
}
