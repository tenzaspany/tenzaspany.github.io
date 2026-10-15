import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

function Geometry() {
  const group = useRef<Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    group.current.rotation.y += 0.0025 + (pointer.x * 0.28 - group.current.rotation.y) * 0.018
    group.current.rotation.x += (pointer.y * 0.18 - group.current.rotation.x) * 0.018
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.16) * 0.08
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.28, 1]} />
        <meshBasicMaterial color="#5270ff" wireframe transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.15]}>
        <icosahedronGeometry args={[0.79, 1]} />
        <meshBasicMaterial color="#8ea0ff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[1.1, 0.2, 0.1]}>
        <torusGeometry args={[1.72, 0.003, 4, 120]} />
        <meshBasicMaterial color="#8293ff" transparent opacity={0.52} />
      </mesh>
      <mesh rotation={[0.4, 1.2, 0.1]}>
        <torusGeometry args={[1.92, 0.002, 4, 120]} />
        <meshBasicMaterial color="#3151e0" transparent opacity={0.62} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <Float speed={0.6} rotationIntensity={0.04} floatIntensity={0.08}>
        <Geometry />
      </Float>
    </Canvas>
  )
}
