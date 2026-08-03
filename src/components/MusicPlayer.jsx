import { motion } from 'framer-motion'
import { Pause, Play, Repeat, Volume2, Music2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const tracks = [
  { title: 'Har Har Mahadev', artist: 'Divine Pulse', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtube: 'https://www.youtube.com/results?search_query=har+har+mahadev+bhajan' },
  { title: 'Shiv Tandav', artist: 'Cosmic Rhythm', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtube: 'https://www.youtube.com/results?search_query=shiv+tandav+bhajan' },
  { title: 'Om Namah Shivaya', artist: 'Sacred Echo', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtube: 'https://www.youtube.com/results?search_query=om+namah+shivaya+chant' },
  { title: 'Mahamrityunjaya Mantra', artist: 'Celestial Chant', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtube: 'https://www.youtube.com/results?search_query=mahamrityunjaya+mantra' },
]

const MusicPlayer = () => {
  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [loop, setLoop] = useState(false)

  const currentTrack = useMemo(() => tracks[trackIndex], [trackIndex])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  const togglePlayback = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const value = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(Number.isFinite(value) ? value : 0)
  }

  const handleSeek = (value) => {
    if (!audioRef.current) return
    const nextTime = (value / 100) * audioRef.current.duration
    audioRef.current.currentTime = nextTime
    setProgress(value)
  }

  const nextTrack = () => {
    const nextIndex = (trackIndex + 1) % tracks.length
    setTrackIndex(nextIndex)
    setIsPlaying(false)
    setProgress(0)
  }

  const prevTrack = () => {
    const prevIndex = (trackIndex - 1 + tracks.length) % tracks.length
    setTrackIndex(prevIndex)
    setIsPlaying(false)
    setProgress(0)
  }

  const selectTrack = (index) => {
    setTrackIndex(index)
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <section id="music" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050608]/80 p-6 shadow-[0_0_70px_rgba(110,168,254,0.1)] backdrop-blur-xl lg:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6EA8FE]/30 bg-[#6EA8FE]/10 px-3 py-1 text-sm text-[#6EA8FE]">
              <Music2 className="h-4 w-4" /> Devotional Soundscape
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">A floating audio temple for sacred listening.</h2>
            <p className="mt-4 text-slate-400">Blend meditative stillness with the energizing pulse of Tandava and devotional chants.</p>
          </div>

          <div className="rounded-[1.5rem] border border-[#FF9933]/20 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-[#FF9933]/20 bg-[#FF9933]/10 p-3 text-[#FF9933]">
                <Music2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Now playing</p>
                <p className="text-lg font-semibold text-white">{currentTrack.title}</p>
                <p className="text-sm text-slate-400">{currentTrack.artist}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#111827]/80 to-[#050608]/80 p-5">
          <div className="mb-5 rounded-[1rem] border border-[#FF9933]/20 bg-[#FF9933]/10 p-4 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF9933]">Powerful Shiv Bhajans</p>
            <p className="mt-1 font-semibold text-white">Feel the energy of Lord Shiva through sacred melodies and divine rhythm.</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{currentTrack.artist}</p>
              <p className="text-xl font-semibold text-white">{currentTrack.title}</p>
            </div>
            <button onClick={() => setLoop(!loop)} className={`rounded-full p-2 ${loop ? 'bg-[#FF9933]/20 text-[#FF9933]' : 'bg-white/5 text-slate-300'}`}>
              <Repeat className="h-5 w-5" />
            </button>
          </div>

          <audio ref={audioRef} src={currentTrack.src} loop={loop} onEnded={nextTrack} onTimeUpdate={handleTimeUpdate} />

          <div className="mt-6 flex items-center gap-3">
            <button onClick={prevTrack} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200">◀</button>
            <button onClick={togglePlayback} className="rounded-full bg-gradient-to-r from-[#FF9933] to-[#f0b24f] p-3 text-black shadow-[0_0_30px_rgba(255,153,51,0.25)]">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={nextTrack} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200">▶</button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => handleSeek(Number(event.target.value))}
                className="w-full accent-[#FF9933]"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="accent-[#6EA8FE]"
              />
            </div>

            <div className="flex-1 lg:max-w-[320px]">
              <p className="mb-3 text-sm text-slate-400">Sacred tracks</p>
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <button
                    key={track.title}
                    onClick={() => selectTrack(index)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                      index === trackIndex
                        ? 'border-[#FF9933]/40 bg-[#FF9933]/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>{track.title}</span>
                    <a
                      href={track.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6EA8FE]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open
                    </a>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicPlayer
