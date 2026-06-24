import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  ContactShadows,
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { SkeletonUtils } from 'three-stdlib'

const DEFAULT_MODEL_URL = '/models/focused_student_with_laptop.glb'

useGLTF.preload(DEFAULT_MODEL_URL)

function useIsCompact() {
  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handleChange = (event) => setIsCompact(event.matches)

    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange)
      return () => mq.removeEventListener('change', handleChange)
    }

    mq.addListener(handleChange)
    return () => mq.removeListener(handleChange)
  }, [])

  return isCompact
}

function LoadingFallback() {
  return (
    <Html center distanceFactor={10} className="pointer-events-none">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#040B18]/90 px-4 py-3 text-sm text-white/80 shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-[#38BDF8]" />
        Loading 3D model
      </div>
    </Html>
  )
}

function AvatarModel({ modelUrl, isCompact, reducedMotion }) {
  const groupRef = useRef()
  const gltf = useGLTF(modelUrl)
  const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, names } = useAnimations(gltf.animations, groupRef)

  const bounds = useMemo(() => new THREE.Box3(), [])
  const size = useMemo(() => new THREE.Vector3(), [])
  const center = useMemo(() => new THREE.Vector3(), [])

  const targetScale = isCompact ? 2.7 : 3.4
  const baseY = isCompact ? -1.02 : -0.88
  const frontRotationY = Math.PI

  useLayoutEffect(() => {
    if (!groupRef.current) return

    bounds.setFromObject(clonedScene)
    bounds.getSize(size)
    bounds.getCenter(center)

    clonedScene.position.sub(center)
    clonedScene.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
    })

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const uniformScale = targetScale / maxDim

    groupRef.current.scale.setScalar(uniformScale)
    groupRef.current.position.set(0, baseY, 0)
    groupRef.current.rotation.set(-0.04, frontRotationY, 0.012)
  }, [baseY, bounds, clonedScene, center, frontRotationY, isCompact, size, targetScale])

  useEffect(() => {
    if (reducedMotion) {
      Object.values(actions).forEach((action) => action?.stop())
      return undefined
    }

    const preferredAction =
      names.find((name) => /idle|breath|sit/i.test(name)) ?? names[0]

    Object.values(actions).forEach((action) => action?.stop())

    if (preferredAction && actions[preferredAction]) {
      actions[preferredAction].reset().fadeIn(0.25).play()
    }

    return () => Object.values(actions).forEach((action) => action?.stop())
  }, [actions, names, reducedMotion])

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

function ReactGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.55" fill="currentColor" />
    </svg>
  )
}

function NodeGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 2l8.4 4.85v9.7L12 21.4l-8.4-4.85v-9.7L12 2z" fill="currentColor" />
      <path
        d="M9 9.3h6M9 12h6M9 14.7h4.4"
        stroke="#08111f"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MongoGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2c-.4 0-.7.2-.9.5C9.4 5.1 8 8.6 8 12.5c0 3 1.5 5.5 4 6.9l0 2.6c0 .7.5 1.2 1.2 1.2h.1V2h-.1z"
        fill="currentColor"
      />
      <path
        d="M12 4.2v15.6c.7-.3 1.3-.7 1.8-1.2.8-.8 1.2-2 1.2-3.4 0-3.8-1.4-7.3-3-11z"
        fill="#fff"
        opacity="0.22"
      />
    </svg>
  )
}

function JavaGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M8.2 17.1c0 1.7 2.1 2.7 3.8 2.7s4-.9 4-2.7c0-1.2-1.2-1.8-2.4-2.2"
        strokeWidth="1.7"
      />
      <path d="M9.1 15.2c1.1-.7 3.3-.7 4.4 0" strokeWidth="1.6" />
      <path
        d="M10 9.7c1.7-2 2.1-3.4 1.3-5.1M13.4 10c1.1-1.3 1.5-2.5 1.1-3.9"
        strokeWidth="1.5"
      />
      <path d="M6.9 18.5h10.4" strokeWidth="1.5" />
      <path d="M7.7 11.5h8.7v4.5H7.7z" fill="currentColor" opacity="0.9" stroke="none" />
    </svg>
  )
}

const ORBIT_BADGES = [
  {
    key: 'react',
    label: 'React',
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.45)',
    angle: 220,
    spin: 8,
    size: 58,
    compactSize: 44,
    duration: 5.8,
    delay: 0.15,
    Glyph: ReactGlyph,
  },
  {
    key: 'node',
    label: 'Node.js',
    color: '#6DDC6D',
    glow: 'rgba(109, 220, 109, 0.38)',
    angle: 318,
    spin: -8,
    size: 58,
    compactSize: 42,
    duration: 6.2,
    delay: 0.6,
    Glyph: NodeGlyph,
  },
  {
    key: 'mongo',
    label: 'MongoDB',
    color: '#47A248',
    glow: 'rgba(71, 162, 72, 0.38)',
    angle: 190,
    spin: 7,
    size: 58,
    compactSize: 42,
    duration: 5.9,
    delay: 1.05,
    Glyph: MongoGlyph,
  },
  {
    key: 'java',
    label: 'Java',
    color: '#F97316',
    glow: 'rgba(249, 115, 22, 0.34)',
    angle: 32,
    spin: -10,
    size: 58,
    compactSize: 42,
    duration: 6.5,
    delay: 1.4,
    Glyph: JavaGlyph,
  },
]

const STARS = [
  {
    top: '10%',
    left: '15%',
    size: 3.2,
    duration: 7.2,
    delay: 0.15,
    opacity: 0.65,
    color: 'rgba(255,255,255,0.88)',
  },
  {
    top: '16%',
    left: '48%',
    size: 2.2,
    duration: 6.8,
    delay: 0.8,
    opacity: 0.5,
    color: 'rgba(56,189,248,0.9)',
  },
  {
    top: '23%',
    left: '78%',
    size: 3.8,
    duration: 7.8,
    delay: 1.2,
    opacity: 0.56,
    color: 'rgba(99,102,241,0.8)',
  },
  {
    top: '31%',
    left: '10%',
    size: 2.2,
    duration: 6.1,
    delay: 0.4,
    opacity: 0.42,
    color: 'rgba(255,255,255,0.82)',
  },
  {
    top: '39%',
    left: '84%',
    size: 2.8,
    duration: 6.9,
    delay: 1.45,
    opacity: 0.48,
    color: 'rgba(56,189,248,0.74)',
  },
  {
    top: '52%',
    left: '25%',
    size: 3.6,
    duration: 7.1,
    delay: 0.95,
    opacity: 0.58,
    color: 'rgba(103,232,249,0.9)',
  },
  {
    top: '64%',
    left: '70%',
    size: 2.4,
    duration: 6.3,
    delay: 1.55,
    opacity: 0.44,
    color: 'rgba(255,255,255,0.78)',
  },
  {
    top: '74%',
    left: '14%',
    size: 2.8,
    duration: 7.6,
    delay: 0.3,
    opacity: 0.5,
    color: 'rgba(99,102,241,0.76)',
  },
]

function OrbitBadge({ badge, radius, isCompact, reducedMotion }) {
  const size = isCompact ? badge.compactSize : badge.size
  const angle = (badge.angle * Math.PI) / 180
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.74
  const Glyph = badge.Glyph

  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        zIndex: 30,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="relative flex items-center justify-center rounded-[18px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] backdrop-blur-[14px] shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
        style={{
          width: size,
          height: size,
          color: badge.color,
          borderColor: badge.color,
          boxShadow: `0 0 24px ${badge.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -6, 0],
                rotate: [0, badge.spin, 0],
              }
        }
        transition={{
          duration: badge.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: badge.delay,
        }}
      >
        <div className="absolute inset-[8%] rounded-[14px] border border-white/10 bg-white/[0.03]" />
        <Glyph className={isCompact ? 'h-[16px] w-[16px]' : 'h-[20px] w-[20px]'} />
      </motion.div>
    </div>
  )
}

function Spark({ spark, reducedMotion }) {
  return (
    <motion.span
      className="absolute rounded-full"
      style={{
        top: spark.top,
        left: spark.left,
        width: spark.size,
        height: spark.size,
        background: spark.color,
        opacity: spark.opacity,
        boxShadow: `0 0 18px ${spark.color}`,
        zIndex: 12,
      }}
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -8, 0],
              x: [0, 2, 0],
              opacity: [spark.opacity, Math.min(1, spark.opacity + 0.2), spark.opacity],
            }
      }
      transition={{
        duration: spark.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: spark.delay,
      }}
    />
  )
}

function ScenePlant({ reducedMotion }) {
  return (
    <motion.div
      className="absolute bottom-[15%] left-[5%] hidden h-[118px] w-[92px] pointer-events-none sm:block"
      style={{ zIndex: 22 }}
      aria-hidden="true"
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -4, 0],
              rotate: [0, -1.2, 0],
            }
      }
      transition={{
        duration: 6.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-x-[20px] bottom-0 h-[36px] rounded-[10px_10px_14px_14px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(5,10,20,0.98))] shadow-[0_0_18px_rgba(56,189,248,0.08)]" />
      <div className="absolute left-1/2 bottom-[26px] h-[56px] w-[60px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.46)_0%,rgba(34,197,94,0.16)_42%,transparent_76%)] blur-[8px]" />
      <div className="absolute bottom-[24px] left-[16px] h-[42px] w-[14px] rotate-[-18deg] rounded-full bg-[#22c55e] shadow-[0_0_16px_rgba(34,197,94,0.46)]" />
      <div className="absolute bottom-[28px] left-[30px] h-[48px] w-[14px] rotate-[8deg] rounded-full bg-[#34d399] shadow-[0_0_16px_rgba(34,197,94,0.42)]" />
      <div className="absolute bottom-[26px] right-[16px] h-[40px] w-[14px] rotate-[18deg] rounded-full bg-[#16a34a] shadow-[0_0_16px_rgba(34,197,94,0.42)]" />
      <div className="absolute bottom-[20px] left-1/2 h-[2px] w-[30px] -translate-x-1/2 rounded-full bg-[#22c55e]/70" />
    </motion.div>
  )
}

function SceneBag({ reducedMotion }) {
  return (
    <motion.div
      className="absolute bottom-[13%] right-[5.5%] hidden h-[110px] w-[98px] pointer-events-none sm:block"
      style={{ zIndex: 22 }}
      aria-hidden="true"
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, 3, 0],
              rotate: [0, 1.1, 0],
            }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle,rgba(99,102,241,0.16)_0%,transparent_70%)] blur-[10px]" />
      <div className="absolute bottom-[4px] left-1/2 h-[70px] w-[76px] -translate-x-1/2 rounded-[18px_18px_22px_22px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,20,35,0.98),rgba(4,10,20,0.98))] shadow-[0_16px_30px_rgba(0,0,0,0.42)]" />
      <div className="absolute bottom-[58px] left-1/2 h-[18px] w-[30px] -translate-x-1/2 rounded-full border border-[#38BDF8]/18 bg-[#040B18]" />
      <div className="absolute bottom-[16px] left-1/2 h-[18px] w-[56px] -translate-x-1/2 rounded-full border border-white/8 bg-[#0f172a]/95" />
      <div className="absolute bottom-[26px] left-[20px] h-[22px] w-[8px] rounded-full bg-white/10" />
      <div className="absolute bottom-[26px] right-[20px] h-[22px] w-[8px] rounded-full bg-white/10" />
    </motion.div>
  )
}

function SceneCodeChip({ reducedMotion }) {
  return (
    <motion.div
      className="absolute bottom-[10.5%] left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ zIndex: 23 }}
      aria-hidden="true"
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -3, 0],
            }
      }
      transition={{
        duration: 5.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 rounded-[12px] bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,transparent_72%)] blur-[8px]" />
      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,32,0.98),rgba(5,10,19,0.98))] text-[0.8rem] font-extrabold text-white/70 shadow-[0_10px_18px_rgba(0,0,0,0.32)]">
        &lt;/&gt;
      </div>
    </motion.div>
  )
}

function OrbitingStage({ reducedMotion, isCompact }) {
  const platformWidth = isCompact ? 260 : 420
  const platformHeight = isCompact ? 88 : 118

  const outerRingClass = reducedMotion
    ? 'absolute inset-[2%] rounded-full border border-[#38BDF8]/20 shadow-[0_0_46px_rgba(56,189,248,0.14)]'
    : 'absolute inset-[2%] rounded-full border border-[#38BDF8]/20 shadow-[0_0_46px_rgba(56,189,248,0.14)] animate-[rotCW_48s_linear_infinite]'
  const middleRingClass = reducedMotion
    ? 'absolute inset-[13%] rounded-full border border-[#6366F1]/32 shadow-[0_0_28px_rgba(99,102,241,0.12)]'
    : 'absolute inset-[13%] rounded-full border border-[#6366F1]/32 shadow-[0_0_28px_rgba(99,102,241,0.12)] animate-[rotCCW_66s_linear_infinite]'
  const innerRingClass = reducedMotion
    ? 'absolute inset-[27%] rounded-full border border-white/10'
    : 'absolute inset-[27%] rounded-full border border-white/10 animate-[rotCW_30s_linear_infinite]'
  const thinRingClass = reducedMotion
    ? 'absolute inset-[40%] rounded-full border border-[#38BDF8]/12'
    : 'absolute inset-[40%] rounded-full border border-[#38BDF8]/12 animate-[rotCCW_20s_linear_infinite]'
  const coreRingClass = reducedMotion
    ? 'absolute inset-[30%] rounded-full border border-[#6366F1]/25'
    : 'absolute inset-[30%] rounded-full border border-[#6366F1]/25 animate-[rotCW_26s_linear_infinite]'
  const innerGlowClass = reducedMotion
    ? 'absolute inset-[9%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(99,102,241,0.08)_52%,transparent_74%)] blur-[22px] opacity-80'
    : 'absolute inset-[9%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(99,102,241,0.08)_52%,transparent_74%)] blur-[22px] opacity-80 animate-[pulse_7s_ease-in-out_infinite]'

  return (
    <>
      <div
        className="absolute left-1/2 top-[40%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none min-[640px]:h-[460px] min-[640px]:w-[460px]"
        style={{ zIndex: 8 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(67,97,238,0.12)_42%,transparent_74%)] blur-[52px]" />
        <div className={outerRingClass} />
        <div className={middleRingClass} />
        <div className={innerRingClass} />
        <div className={thinRingClass} />
        <div className={innerGlowClass} />
      </div>

      {ORBIT_BADGES.map((badge) => (
        <OrbitBadge
          key={badge.key}
          badge={badge}
          radius={isCompact ? 112 : 176}
          isCompact={isCompact}
          reducedMotion={reducedMotion}
        />
      ))}

      {STARS.map((spark, index) => (
        <Spark key={`${spark.top}-${spark.left}-${index}`} spark={spark} reducedMotion={reducedMotion} />
      ))}

      <div
        className="absolute left-1/2 bottom-[3%] -translate-x-1/2 pointer-events-none"
        style={{
          width: platformWidth,
          height: platformHeight,
          zIndex: 9,
          transform: 'translateX(-50%) perspective(900px) rotateX(74deg)',
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(67,97,238,0.5)_0%,rgba(56,189,248,0.16)_42%,transparent_76%)] blur-[20px]" />
        <div className="absolute inset-[4px] rounded-full border border-[#4361EE]/45 bg-[linear-gradient(180deg,rgba(7,12,24,0.28),rgba(4,11,24,0.94))] shadow-[0_0_34px_rgba(67,97,238,0.35),inset_0_0_26px_rgba(56,189,248,0.08)]" />
        <div className="absolute inset-[18px] rounded-full border border-[#38BDF8]/20" />
        <div className="absolute left-[14%] right-[14%] top-[48%] h-[6px] rounded-full bg-[#38BDF8]/35 blur-[10px]" />
        <div className={coreRingClass} />
      </div>

      <ScenePlant reducedMotion={reducedMotion} />
      <SceneBag reducedMotion={reducedMotion} />
      <SceneCodeChip reducedMotion={reducedMotion} />
    </>
  )
}

function DeveloperScene({ modelUrl, isCompact, reducedMotion }) {
  const targetY = isCompact ? -0.54 : -0.48

  return (
    <>
      <ambientLight intensity={0.92} color="#dbeafe" />
      <hemisphereLight intensity={0.8} color="#e0f2fe" groundColor="#08111f" />
      <directionalLight position={[3.5, 6.5, 7]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, 3, 4]} intensity={0.85} color="#8b9cff" />
      <pointLight position={[0, 2.2, 3.8]} intensity={1.05} color="#38BDF8" distance={14} />
      <pointLight position={[2.8, 1.8, 2]} intensity={0.72} color="#8b5cf6" distance={12} />
      <pointLight position={[-3, 1.1, -2]} intensity={0.24} color="#22c55e" distance={10} />

      <OrbitControls
        makeDefault
        target={[0, targetY, 0]}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.72}
        minPolarAngle={0.18}
        maxPolarAngle={Math.PI - 0.18}
      />

      <Suspense fallback={<LoadingFallback />}>
        <AvatarModel modelUrl={modelUrl} isCompact={isCompact} reducedMotion={reducedMotion} />
      </Suspense>

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.42}
        scale={12}
        blur={2.9}
        far={5.5}
        resolution={256}
        color="#020817"
      />
    </>
  )
}

export default function ThreeAvatar({ modelUrl = DEFAULT_MODEL_URL }) {
  const isCompact = useIsCompact()
  const reducedMotion = useReducedMotion()
  const stageHeight = isCompact ? 470 : 640
  const cameraPosition = isCompact ? [0, 0.55, 8.9] : [0, 0.55, 9.7]
  const targetY = isCompact ? -0.54 : -0.48

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[560px] overflow-visible px-0"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      aria-label="3D developer workstation illustration"
      role="img"
    >
      <div
        className="relative mx-auto flex w-full items-center justify-center overflow-visible"
        style={{ height: stageHeight }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[41%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,97,238,0.12)_0%,rgba(56,189,248,0.08)_36%,transparent_72%)] blur-[64px] min-[640px]:h-[520px] min-[640px]:w-[520px]" />

        <OrbitingStage reducedMotion={reducedMotion} isCompact={isCompact} />

        <Canvas
          className="!absolute inset-x-0 top-[8%] bottom-[10%] !h-auto !w-full block pointer-events-auto z-[20]"
          shadows
          camera={{ position: cameraPosition, fov: isCompact ? 27 : 28 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, isCompact ? 1.15 : 1.55]}
          onCreated={({ camera, gl }) => {
            camera.lookAt(0, targetY, 0)
            gl.setClearColor(new THREE.Color(0x000000), 0)
          }}
        >
          <DeveloperScene modelUrl={modelUrl} isCompact={isCompact} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </motion.div>
  )
}
