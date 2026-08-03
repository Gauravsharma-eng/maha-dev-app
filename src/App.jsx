import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Gallery from './components/Gallery'
import MalaCounter from './components/MalaCounter'
import DailyMotivation from './components/DailyMotivation'
import JyotirlingaSection from './components/JyotirlingaSection'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(110,168,254,0.11),_transparent_25%),linear-gradient(135deg,_#050608_0%,_#0A0A0A_45%,_#07080B_100%)] text-slate-100">
      <Navbar />
      <main>
        <Hero3D />
        <Gallery />
        <JyotirlingaSection />
        <MalaCounter />
        <DailyMotivation />
        <MusicPlayer />
      </main>
      <Footer />
    </div>
  )
}

export default App
