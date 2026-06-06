import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { SkeletonUtils } from 'three-stdlib'

const MODEL_OPTIONS = [
  { key: 'dev', label: 'Developer', url: '/models/focused_student_with_laptop.glb' },
  { key: 'anime', label: ' Developer Anime', url: '/models/anime_hair_19.glb' },
  { key: 'room', label: 'Developer Room', url: '/models/programmer_desk_setup__stylized_3d_room.glb' },
  { key: 'setup', label: 'Desk Setup', url: '/models/modern_desk_setup__game_ready_3d_model.glb' },
]

MODEL_OPTIONS.forEach((model) => useGLTF.preload(model.url))

function useIsCompactViewport() {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleChange = () => setIsCompact(mediaQuery.matches)

    handleChange()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return isCompact
}

function LaptopModel({ isCompact, url }) {
  const rootRef = useRef()
  const model = useGLTF(url)
  const clonedScene = useMemo(() => SkeletonUtils.clone(model.scene), [model.scene])
  const { actions, names } = useAnimations(model.animations, rootRef)

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined

    const box = new THREE.Box3().setFromObject(clonedScene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()

    box.getSize(size)
    box.getCenter(center)

    clonedScene.position.sub(center)

    const maxDimension = Math.max(size.x, size.y, size.z)
    const targetSize = isCompact ? 2.5 : 3.8
    const scale = targetSize / maxDimension

    rootRef.current.scale.setScalar(scale)
    rootRef.current.position.set(0, isCompact ? -1.08 : -0.88, 0)
    rootRef.current.rotation.set(-0.04, isCompact ? -0.08 : -0.18, 0.02)

    return undefined
  }, [clonedScene, isCompact, model.animations.length, names])

  useEffect(() => {
    const actionNames = names ?? []
    const primaryName =
      actionNames.find((name) => name.toLowerCase().includes('scene')) ??
      actionNames[0]

    Object.values(actions).forEach((action) => action?.stop())

    if (primaryName && actions[primaryName]) {
      actions[primaryName].reset().fadeIn(0.25).play()
    }

    return () => {
      Object.values(actions).forEach((action) => action?.stop())
    }
  }, [actions, names, url])

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    if (rootRef.current) {
      rootRef.current.rotation.y = (isCompact ? -0.08 : -0.18) + mouse.x * 0.02 + Math.sin(t * 0.35) * 0.015
      rootRef.current.rotation.x = -0.05 + mouse.y * 0.02 + Math.sin(t * 0.5) * 0.008
      rootRef.current.position.y = (isCompact ? -1.08 : -0.88) + Math.sin(t * 0.95) * 0.018
      rootRef.current.position.x = mouse.x * 0.004
      rootRef.current.position.z = Math.sin(t * 0.7) * 0.01
    }
  })

  return (
    <group ref={rootRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

function LaptopScene({ isCompact, url }) {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <ambientLight intensity={1.25} color="#ffffff" />
      <hemisphereLight intensity={0.8} color="#dff7ff" groundColor="#08111f" />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.7} color="#8fb6ff" />
      <pointLight position={[0, 2.2, 3.5]} intensity={1.05} color="#ffffff" distance={14} />
      <pointLight position={[0, 1.2, -2]} intensity={0.28} color="#7c3aed" distance={10} />

      <Suspense fallback={null}>
        <LaptopModel isCompact={isCompact} url={url} />
      </Suspense>

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.25}
        target={[0, -0.75, 0]}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 3.2}
      />
    </>
  )
}

export default function ThreeAvatar() {
  const isCompact = useIsCompactViewport()
  const [activeModelIndex, setActiveModelIndex] = useState(0)
  const activeModel = MODEL_OPTIONS[activeModelIndex]
  const hasAnimations = activeModel.key === 'room'

  return (
    <motion.div
      className="avatar-stage"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      aria-label="3D desktop workstation illustration"
    >
      <div className="avatar-canvas-shell" aria-hidden="true">
        <Canvas
          key={activeModel.url}
          className="hero-avatar-canvas"
          camera={{ position: [0, 0.3, isCompact ? 8.8 : 9.4], fov: isCompact ? 26 : 28 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
          dpr={[1, isCompact ? 1.15 : 1.6]}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), 0)
          }}
        >
          <LaptopScene isCompact={isCompact} url={activeModel.url} />
        </Canvas>
      </div>
      <div className="hero-model-footer">
        <div className="hero-model-title">
          {activeModel.label}
          <span>{hasAnimations ? 'Interactive' : 'Join With Animation'}</span>
        </div>
        <div className="hero-model-switcher" role="tablist" aria-label="3D model options">
          {MODEL_OPTIONS.map((model, index) => (
            <button
              key={model.key}
              type="button"
              className={`hero-model-chip ${index === activeModelIndex ? 'active' : ''}`}
              onClick={() => setActiveModelIndex(index)}
              aria-pressed={index === activeModelIndex}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
