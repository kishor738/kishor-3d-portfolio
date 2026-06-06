import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function GlobalScene3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 220)
    camera.position.set(0, 4, 34)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    const root = new THREE.Group()
    scene.add(root)

    const mouse = new THREE.Vector2(0, 0)
    const smoothMouse = new THREE.Vector2(0, 0)

    const particleCount = window.innerWidth < 768 ? 520 : 980
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSeeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 16 + Math.random() * 52
      const angle = Math.random() * Math.PI * 2
      particlePositions[i * 3] = Math.cos(angle) * radius
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 34
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius - 16
      particleSeeds[i] = Math.random() * Math.PI * 2
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.075,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    root.add(particles)

    const grid = new THREE.GridHelper(110, 44, 0x22d3ee, 0x1e3a8a)
    grid.position.set(0, -12, -8)
    grid.material.transparent = true
    grid.material.opacity = 0.18
    root.add(grid)

    const ribbonGroup = new THREE.Group()
    root.add(ribbonGroup)

    const ribbons = Array.from({ length: 3 }, (_, index) => {
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 9 }, (_, pointIndex) => {
          const x = (pointIndex - 4) * 7
          const y = Math.sin(pointIndex * 0.9 + index) * 2.2 + index * 1.8
          const z = -18 - index * 4 + Math.cos(pointIndex + index) * 2
          return new THREE.Vector3(x, y, z)
        })
      )
      const geometry = new THREE.TubeGeometry(curve, 96, 0.025 + index * 0.01, 8, false)
      const material = new THREE.MeshBasicMaterial({
        color: [0x38bdf8, 0x818cf8, 0x2dd4bf][index],
        transparent: true,
        opacity: 0.42 - index * 0.08,
        blending: THREE.AdditiveBlending,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = index * 1.4 - 1.8
      ribbonGroup.add(mesh)
      return mesh
    })

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.9, 2),
      new THREE.MeshBasicMaterial({
        color: 0xc4b5fd,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      })
    )
    core.position.set(11, 1, -12)
    root.add(core)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(5.2, 0.025, 12, 120),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      })
    )
    ring.position.copy(core.position)
    ring.rotation.x = Math.PI * 0.62
    root.add(ring)

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    let frameId = 0

    const animate = () => {
      const time = clock.getElapsedTime()
      smoothMouse.lerp(mouse, 0.055)

      const positions = particleGeo.attributes.position
      for (let i = 0; i < positions.count; i += 1) {
        const base = i * 3
        positions.array[base + 1] += Math.sin(time * 0.55 + particleSeeds[i]) * 0.0025
        positions.array[base + 2] += 0.018
        if (positions.array[base + 2] > 42) positions.array[base + 2] = -72
      }
      positions.needsUpdate = true

      root.rotation.y = smoothMouse.x * 0.075
      root.rotation.x = -smoothMouse.y * 0.035
      particles.rotation.y = time * 0.018

      grid.position.z = ((time * 3.8) % 5) - 10
      ribbonGroup.position.x = smoothMouse.x * 1.3
      ribbonGroup.position.y = smoothMouse.y * 0.8

      ribbons.forEach((ribbon, index) => {
        ribbon.rotation.z = Math.sin(time * 0.22 + index) * 0.08
        ribbon.position.y = Math.sin(time * 0.35 + index) * 0.8
      })

      core.rotation.x = time * 0.18
      core.rotation.y = time * 0.24
      ring.rotation.z = time * 0.16
      ring.rotation.y = Math.sin(time * 0.3) * 0.45

      camera.position.x += (smoothMouse.x * 3.8 - camera.position.x) * 0.035
      camera.position.y += (4 + smoothMouse.y * 2.2 - camera.position.y) * 0.035
      camera.lookAt(0, -1, -16)

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      particleGeo.dispose()
      particleMat.dispose()
      grid.geometry.dispose()
      grid.material.dispose()
      ribbons.forEach((ribbon) => {
        ribbon.geometry.dispose()
        ribbon.material.dispose()
      })
      core.geometry.dispose()
      core.material.dispose()
      ring.geometry.dispose()
      ring.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="global-scene-canvas" aria-hidden="true" />
}

export default GlobalScene3D
