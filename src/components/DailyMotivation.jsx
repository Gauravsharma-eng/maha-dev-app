import { motion } from 'framer-motion'
import { Sparkles, Share2 } from 'lucide-react'

const dailyQuotes = [
  {
    title: 'The stillness of Shiva',
    quote: 'When the mind is still, the universe speaks in silence.',
    insight: 'Let stillness become your greatest strength today.',
  },
  {
    title: 'The power of surrender',
    quote: 'True strength is not in control, but in surrendering to the divine flow.',
    insight: 'Release what you cannot hold and trust the path.',
  },
  {
    title: 'The fire of transformation',
    quote: 'Shiva does not destroy; he transforms what is ready to evolve.',
    insight: 'Let change be a blessing rather than a fear.',
  },
  {
    title: 'The endless compassion',
    quote: 'Compassion is the truest form of power the world can remember.',
    insight: 'Offer kindness before judgment and peace before pride.',
  },
]

const DailyMotivation = () => {
  const getDailyQuote = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayIndex = Math.floor(today.getTime() / 86400000) % dailyQuotes.length
    return dailyQuotes[dayIndex]
  }

  const item = getDailyQuote()

  const shareStory = (platform) => {
    const text = `${item.quote}\n— ${item.title}`
    const encoded = encodeURIComponent(text)
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer')
    } else {
      window.open(`https://www.instagram.com/`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_70px_rgba(110,168,254,0.1)] backdrop-blur-xl lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-3 py-1 text-sm text-[#FF9933]">
              <Sparkles className="h-4 w-4" /> Daily Shivani
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{item.title}</h2>
            <p className="mt-5 text-xl leading-8 text-slate-300">“{item.quote}”</p>
            <p className="mt-4 text-slate-400">{item.insight}</p>
          </div>

          <div className="rounded-[1.5rem] border border-[#6EA8FE]/20 bg-[#050608]/70 p-6">
            <div className="rounded-[1.2rem] border border-[#FF9933]/20 bg-gradient-to-br from-[#FF9933]/20 to-[#6EA8FE]/10 p-5 text-slate-100">
              <p className="text-sm uppercase tracking-[0.35em] text-[#FF9933]">Story Card</p>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-300">{item.quote}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => shareStory('whatsapp')}
                className="flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-4 py-2 text-sm text-[#FF9933]"
              >
                <Share2 className="h-4 w-4" />
                Share to WhatsApp
              </button>
              <button
                onClick={() => shareStory('instagram')}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
              >
                <Share2 className="h-4 w-4" />
                Instagram Story
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default DailyMotivation
