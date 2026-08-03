import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const jyotirlingas = [
  { name: 'Somnath', place: 'Gujarat', image: 'https://e1.pxfuel.com/desktop-wallpaper/563/306/desktop-wallpaper-shree-somnath-jyotirlinga-temple-somnath-mahadev.jpg' },
  { name: 'Mallikarjuna', place: 'Andhra Pradesh', image: 'https://www.luxurytrailsofindia.com/wp-content/uploads/2025/07/Mallikarjuna-Jyotirlinga-Andhra-Pradesh.jpg' },
  { name: 'Mahakaleshwar', place: 'Madhya Pradesh', image: 'https://i.pinimg.com/736x/86/54/ab/8654ab7b7b88a55d3b1d206839af963b.jpg' },
  { name: 'Omkareshwar', place: 'Madhya Pradesh', image: 'https://www.tirthayatra.org/wp-content/uploads/2025/05/399048390_18311718244136075_6708910764042320053_n-1.jpg' },
  { name: 'Kedarnath', place: 'Uttarakhand', image: 'https://sannidhi.net/wp-content/uploads/2022/12/kedarnath_jyotirlinga.png' },
  { name: 'Bhimashankar', place: 'Maharashtra', image: 'https://www.alightindia.com/cdn/uploads/postimages/MEDIUM/bhimashankar%20ETV--8be6f9.jpg' },
  { name: 'Vishwanath', place: 'Varanasi', image: 'https://static2.tripoto.com/media/filter/nl/img/1569642/SpotDocument/1559898411_1559898408847.jpg.webp' },
  { name: 'Trimbakeshwar', place: 'Maharashtra', image: 'https://indianmythology.co.in/storage/2023/04/TrimbakeshwarJyotirlinga.jpg' },
  { name: 'Baidyanath', place: 'Jharkhand', image: 'https://tse4.mm.bing.net/th/id/OIP.3nCLltFCyWxsRmQ0KOlh4wHaD_?r=0&pid=Api&P=0&h=180' },
  { name: 'Nageshwar', place: 'Gujarat', image: 'https://www.pilgrimpackages.com/upload/package/image-9ZOWMJMYTUMGOISF.jpg' },
  { name: 'Rameshwaram', place: 'Tamil Nadu', image: 'https://indianmythology.co.in/storage/2023/04/RameshwaramJyotirlinga.jpg' },
  { name: 'Grishneshwar', place: 'Maharashtra', image: 'https://tse3.mm.bing.net/th/id/OIP.kbqWWks7CL4fNekJ34bqVwHaEw?r=0&pid=Api&P=0&h=180' },
]

const buildFallbackSvg = (name) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stop-color="#0a0a0a" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g)" />
      <g transform="translate(120,90)">
        <rect x="0" y="0" width="560" height="420" rx="28" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
        <circle cx="280" cy="150" r="90" fill="#FF9933" opacity="0.12" />
        <path d="M260 120 L220 260 L340 260 Z" fill="#FF9933" opacity="0.95" />
        <text x="280" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#fff">${name}</text>
      </g>
    </svg>
  `
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const JyotirlingaSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-3 py-1 text-sm text-[#FF9933]">
            <Sparkles className="h-4 w-4" /> 12 Jyotirlingas of Lord Shiva
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">The sacred abodes of eternal divine power.</h2>
        </div>
        <p className="max-w-2xl text-slate-400">Each sacred shrine radiates the timeless energy of Mahadev and brings a unique spiritual aura to your journey.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jyotirlingas.map((item, index) => {
          const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          const localSrc = `/assets/jyotirlinga/${slug}.jpg`
          return (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_0_70px_rgba(110,168,254,0.08)] backdrop-blur-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget
                  if (!img.dataset.triedLocal) {
                    img.dataset.triedLocal = 'true'
                    img.src = localSrc
                  } else {
                    img.onerror = null
                    img.src = buildFallbackSvg(item.name)
                  }
                }}
                className="h-64 w-full object-cover bg-[#0b1220]"
              />
              <div className="p-5">
                <p className="text-sm text-[#FF9933]">{item.place}</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-400">A divine center of cosmic energy, devotion, and transcendence.</p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default JyotirlingaSection
