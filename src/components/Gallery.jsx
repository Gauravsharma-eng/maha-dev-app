import { AnimatePresence, motion } from 'framer-motion'
import { Expand, Download, Sparkles } from 'lucide-react'
import { useState } from 'react'

const galleryItems = [
  {
    title: 'Neelkanth',
    subtitle: 'The blue-throated one',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Adiyogi',
    subtitle: 'The first yogi',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Nataraja',
    subtitle: 'The cosmic dancer',
    image:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Tandava',
    subtitle: 'Rhythm of creation',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mahamrityunjaya',
    subtitle: 'The conqueror of death',
    image:
      'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Shiva in Silence',
    subtitle: 'Stillness beyond time',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80',
  },
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-3 py-1 text-sm text-[#FF9933]">
            <Sparkles className="h-4 w-4" /> Sacred Forms of Mahadev
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">A luminous gallery of divine embodiment.</h2>
        </div>
        <p className="max-w-2xl text-slate-400">Each frame brings a new dimension of compassion, power, and cosmic grace into a meditative visual journey.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4, y: -6 }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_0_70px_rgba(110,168,254,0.08)] backdrop-blur-xl"
          >
            <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-sm text-[#FF9933]">{item.subtitle}</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">{item.title}</h3>
            </div>
            <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
              <button
                onClick={() => setSelectedImage(item)}
                className="rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur"
                aria-label={`View ${item.title}`}
              >
                <Expand className="h-4 w-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#050608] shadow-[0_0_80px_rgba(255,153,51,0.2)]"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedImage.image} alt={selectedImage.title} className="h-[70vh] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-[#FF9933]">{selectedImage.subtitle}</p>
                <h3 className="mt-1 text-3xl font-semibold text-white">{selectedImage.title}</h3>
              </div>
              <a
                href={selectedImage.image}
                target="_blank"
                rel="noreferrer"
                download
                className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur"
              >
                <Download className="h-4 w-4" />
                Download Wallpaper
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
