import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative">
      <div className="absolute top-20 left-10 md:left-32 w-16 h-16 bg-pastel-pink rounded-full opacity-50 z-20 animate-spin-slow rotate-12 flex items-center justify-center font-handdrawn font-black text-2xl border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hand-drawn-btn">
        ❓
      </div>
      <div className="absolute top-40 right-10 md:right-32 w-24 h-10 bg-mustard z-20 rotate-12 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] flex items-center justify-center font-handdrawn font-black text-super-dark text-xl hand-drawn">
        Oops!
      </div>
      
      <h1 className="text-[8rem] md:text-[12rem] font-black text-super-dark font-handdrawn leading-none drop-shadow-md hover-wiggle cursor-pointer">
        404
      </h1>
      <div className="bg-white p-6 md:p-10 border-4 border-black-coral shadow-[12px_12px_0_var(--color-pastel-pink)] hand-drawn-alt rotate-[-2deg] max-w-lg mt-4 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-pastel-lavender/90 border-2 border-dashed border-black-coral/30 backdrop-blur-xs z-20 shadow-sm rotate-3 opacity-90 hand-drawn"></div>
        <h2 className="text-3xl font-black text-terracotta mb-4 font-handdrawn uppercase tracking-wide">Halaman Hilang!</h2>
        <p className="text-rhythm-blue font-bold text-lg leading-relaxed mb-8">
          Waduh, sepertinya lembar buku yang kamu cari sudah disobek atau tidak pernah ada isinya.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-wintergreen text-super-dark font-handdrawn text-2xl font-black px-6 py-2 border-[3px] border-black-coral shadow-[4px_4px_0_var(--color-black-coral)] hover:translate-y-px hover:translate-x-px hover:shadow-[2px_2px_0_var(--color-black-coral)] hover:-rotate-2 transition-all rotate-[1deg] hand-drawn-btn"
        >
          Kembali ke Sampul
        </Link>
      </div>
    </div>
  );
}
