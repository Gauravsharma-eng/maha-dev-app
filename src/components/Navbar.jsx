import { Sparkles, Circle } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#FF9933]/40 bg-[#FF9933]/10 p-2 shadow-[0_0_25px_rgba(255,153,51,0.25)]">
            <Sparkles className="h-5 w-5 text-[#FF9933]" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-[#6EA8FE]">MAHADEV</p>
            <p className="text-xs text-slate-400">Shivoham · Divine Presence</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#home" className="transition hover:text-[#FF9933]">Home</a>
          <a href="#gallery" className="transition hover:text-[#FF9933]">Gallery</a>
          <a href="#mala" className="transition hover:text-[#FF9933]">Mala</a>
          <a href="#music" className="transition hover:text-[#FF9933]">Music</a>
        </nav>

        <button className="rounded-full border border-[#6EA8FE]/30 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-[#FF9933]/50 hover:text-[#FF9933]">
          <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          Live Ashram
        </button>
      </div>
    </header>
  )
}

export default Navbar
