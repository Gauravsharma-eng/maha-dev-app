import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Sparkles as SparklesIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { CatmullRomCurve3, MeshStandardMaterial, Vector3 } from 'three'

function NagaCoil() {
  const curve = useMemo(() => {
    const points = []
    const turns = 2.2
    for (let i = 0; i <= 120; i += 1) {
      const t = i / 120
      const angle = t * turns * Math.PI * 2
      const radius = 0.18 + Math.sin(t * Math.PI) * 0.05
      const y = 0.8 + t * 0.82
      points.push(new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
    }
    return new CatmullRomCurve3(points, false, 'centripetal')
  }, [])

  const nagaMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#322f24',
    roughness: 0.32,
    metalness: 0.08,
  }), [])

  return (
    <group>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 140, 0.038, 16, false]} />
        <primitive object={nagaMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 1.68, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#3d3525" roughness={0.3} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.16, 0.035, 16, 80]} />
        <meshStandardMaterial color="#5f4c33" roughness={0.25} metalness={0.08} />
      </mesh>
    </group>
  )
}

function TrishulDamru() {
  const groupRef = useRef(null)
  const goldMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#815b31',
    emissive: '#ab7a3e',
    emissiveIntensity: 0.18,
    roughness: 0.18,
    metalness: 0.95,
    clearcoat: 0.75,
    clearcoatRoughness: 0.14,
  }), [])
  const woodMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#422d1b',
    roughness: 0.58,
    metalness: 0.08,
  }), [])
  const leatherMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#d9c6b0',
    roughness: 0.72,
    metalness: 0.02,
  }), [])
  const stoneMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#161b24',
    emissive: '#0a1118',
    emissiveIntensity: 0.12,
    roughness: 0.92,
    metalness: 0.03,
  }), [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.42
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12 + 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.46}>
        {/* damru */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.16, 0.48, 0.7, 48]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.98, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.16, 0.7, 48]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.74, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.16, 48]} />
          <primitive object={leatherMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.86, 0.38]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.47, 0.045, 16, 96]} />
          <primitive object={leatherMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.86, -0.38]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.47, 0.045, 16, 96]} />
          <primitive object={leatherMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.72, 0.01]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 20]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>

        {/* trishul shaft */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.95, 24]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.4, 0.025]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.95, 20]} />
          <meshStandardMaterial color="#3f3020" roughness={0.4} metalness={0.18} />
        </mesh>

        {/* trishul prongs */}
        <mesh position={[0, 1.65, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.1, 0.38, 32]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.24, 1.43, 0]} rotation={[0, 0, -0.44]} castShadow receiveShadow>
          <coneGeometry args={[0.075, 0.44, 24]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0.24, 1.43, 0]} rotation={[0, 0, 0.44]} castShadow receiveShadow>
          <coneGeometry args={[0.075, 0.44, 24]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.2, 0.03, 16, 100]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.08, 24, 24]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>

        {/* naga coil */}
        <NagaCoil />

        {/* rudraksha beads */}
        {Array.from({ length: 14 }).map((_, idx) => {
          const angle = Math.PI * 1.05 + (idx / 13) * Math.PI * 0.42
          const x = Math.sin(angle) * 0.22
          const y = 0.4 - idx * 0.03
          const z = Math.cos(angle) * 0.16
          return (
            <mesh key={idx} position={[x, y, z]} castShadow receiveShadow>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshStandardMaterial color="#5f371f" roughness={0.82} metalness={0.05} />
            </mesh>
          )
        })}
        <mesh position={[0, 0.22, 0.14]} castShadow receiveShadow>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshStandardMaterial color='#c7a76e' roughness={0.38} metalness={0.1} />
        </mesh>

        {/* glowing Om diya */}
        <group position={[0.78, -0.62, 0.33]}>
          <mesh position={[0, 0, 0.02]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
            <meshStandardMaterial color='#423020' roughness={0.7} metalness={0.12} />
          </mesh>
          <mesh position={[0, 0.045, 0.03]} castShadow receiveShadow>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color='#ffd98e' emissive='#ffd98e' emissiveIntensity={1.4} roughness={0.08} metalness={0.05} />
          </mesh>
        </group>
      </Float>

      <mesh position={[0, -1.14, 0]} receiveShadow>
        <cylinderGeometry args={[1.85, 1.95, 0.26, 64]} />
        <primitive object={stoneMaterial} attach='material' />
      </mesh>
    </group>
  )
}

function Particles() {
  const points = useMemo(() => {
    const positions = []
    for (let i = 0; i < 120; i += 1) {
      positions.push((Math.random() - 0.5) * 6)
      positions.push((Math.random() - 0.5) * 6)
      positions.push((Math.random() - 0.5) * 6)
    }
    return new Float32Array(positions)
  }, [])

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#FF9933" transparent opacity={0.8} depthWrite={false} />
    </points>
  )
}

const Hero3D = () => {
  return (
    <section id="home" className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,168,254,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,153,51,0.16),_transparent_35%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6EA8FE]/30 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <SparklesIcon className="h-4 w-4 text-[#FF9933]" />
            Eternal Presence · Om Namah Shivaya
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
            Welcome to the <span className="text-[#FF9933]">Divine Realm</span> of Mahadev.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            A modern cosmic portal where sacred energy, spiritual rhythm, and immersive design meet in one transcendent experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#gallery" className="rounded-full bg-gradient-to-r from-[#FF9933] to-[#f0b24f] px-6 py-3 font-semibold text-black transition hover:scale-105">
              Explore the Divine Forms
            </a>
            <a href="#mala" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 backdrop-blur transition hover:border-[#6EA8FE]/40">
              Begin Japa Practice
            </a>
          </div>
        </motion.div>

        <div className="relative z-10 h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-3 shadow-[0_0_80px_rgba(110,168,254,0.15)] backdrop-blur-xl sm:h-[540px]">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 2]} intensity={1.8} color="#ffd39e" />
            <pointLight position={[-3, 2, 2]} intensity={2.4} color="#6EA8FE" />
            <Environment preset="night" />
            <TrishulDamru />
            <Particles />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default Hero3D
