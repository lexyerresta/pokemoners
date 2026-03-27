export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-creamy-linen/80 backdrop-blur-sm z-[100] hand-drawn-alt">
      <div className="flex flex-col items-center">
        <div className="text-6xl animate-bounce hover-wiggle">✏️</div>
        <div className="mt-6 text-4xl font-handdrawn font-black text-super-dark shadow-[4px_4px_0_var(--color-pastel-pink)] border-[3px] border-black-coral px-6 py-2 bg-white rotate-[-3deg] hand-drawn-btn relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-dutch-white border border-black-coral/20 rotate-[5deg] z-10"></div>
          Sedang Corat-coret...
        </div>
      </div>
    </div>
  );
}
