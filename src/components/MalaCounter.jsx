import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const MalaCounter = () => {
  const [count, setCount] = useState(0)
  const [celebrating, setCelebrating] = useState(false)

  const beads = useMemo(() => Array.from({ length: 108 }, (_, index) => index + 1), [])

  const handleTap = () => {
    if (count >= 108) return
    const nextCount = count + 1
    setCount(nextCount)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(18)
    }
    if (nextCount === 108) {
      setCelebrating(true)
      playBellChime()
    }
  }

  const resetCounter = () => {
    setCount(0)
    setCelebrating(false)
  }

  useEffect(() => {
    if (!celebrating) return
    const timeout = window.setTimeout(() => setCelebrating(false), 2200)
    return () => window.clearTimeout(timeout)
  }, [celebrating])

  return (
    <section id="mala" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827]/90 to-[#050608]/90 p-6 shadow-[0_0_80px_rgba(255,153,51,0.12)] backdrop-blur-xl lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6EA8FE]/30 bg-[#6EA8FE]/10 px-3 py-1 text-sm text-[#6EA8FE]">
              <Sparkles className="h-4 w-4" /> Om Namah Shivaya Japa Tracker
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">A sacred 108-bead rhythm for mindful practice.</h2>
            <p className="mt-4 text-slate-400">Tap each bead to move through the mantra with intention. The counter glows brighter as you flow through the full cycle.</p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-4 py-2 text-sm text-[#FF9933]">
            <span className="text-2xl font-semibold text-white">{count}</span>
            <span>/ 108</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row">
          <button
            onClick={handleTap}
            className="flex-1 rounded-[1.5rem] border border-[#FF9933]/25 bg-[#050608]/70 p-6 text-left transition hover:border-[#FF9933]/60"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Tap the bead</p>
                <p className="mt-2 text-2xl font-semibold text-white">{count === 0 ? 'Begin your first japa' : `${count} sacred repetitions completed`}</p>
              </div>
              <div className="rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-4 py-2 text-[#FF9933]">
                {count >= 108 ? 'Completed' : 'Next'}
              </div>
            </div>
          </button>

          <button
            onClick={resetCounter}
            className="flex items-center justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-4 text-slate-200 transition hover:border-[#6EA8FE]/40"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Cycle
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {beads.map((bead) => {
            const isActive = bead <= count
            const isCurrent = bead === count + 1
            return (
              <motion.div
                key={bead}
                layout
                animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                  isActive
                    ? 'border-[#FF9933] bg-[#FF9933]/25 text-[#FF9933] shadow-[0_0_18px_rgba(255,153,51,0.25)]'
                    : 'border-white/10 bg-white/5 text-slate-400'
                } ${isCurrent ? 'ring-2 ring-[#6EA8FE]/60' : ''}`}
              >
                {bead}
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {celebrating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 rounded-[1.5rem] border border-[#FF9933]/30 bg-[#FF9933]/10 p-6 text-center text-slate-100"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#FF9933]">Completion</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">108 chants completed. Har Har Mahadev!</h3>
            <p className="mt-2 text-slate-300">The sacred bell resonates. Begin again with calm and devotion.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

function playBellChime() {
  if (typeof window === 'undefined') return
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return
  const ctx = new AudioContext()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(880, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.3)
  gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.6)
}

export default MalaCounter
