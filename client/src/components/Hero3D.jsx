import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const COUNT_X = 10;
const COUNT_Y = 10;
const TOTAL = COUNT_X * COUNT_Y;

function CrystalWave() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Ref to store smoothed mouse position
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT_X; i++) {
      for (let j = 0; j < COUNT_Y; j++) {
        const x = (i - COUNT_X / 2) * 1.0;
        const z = (j - COUNT_Y / 2) * 1.0;
        temp.push({ x, z, y: 0, i, j });
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Slow down time for a more relaxed feel
    const time = state.clock.getElapsedTime() * 0.5;

    // Get normalized mouse position (-1 to 1)
    const { x: targetX, y: targetY } = state.pointer;

    // Smoothly interpolate current mouse position towards target
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.05;

    // Map smoothed mouse to world space
    const mouseX = mouseRef.current.x * 5;
    const mouseZ = -mouseRef.current.y * 5;

    particles.forEach((particle, i) => {
      const { x, z } = particle;

      // Calculate distance to smoothed mouse
      const dx = x - mouseX;
      const dz = z - mouseZ;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Interaction strength (decays with distance)
      const interaction = Math.max(0, 1 - dist / 4);

      // Calculate wave motion
      // Base wave (Slower)
      let y =
        Math.sin(x * 0.5 + time) * 0.5 +
        Math.sin(z * 0.5 + time * 0.8) * 0.5;

      // Add mouse interaction (ripple/lift effect)
      y += Math.sin(dist * 2 - time * 3) * interaction * 1.0;

      // Update dummy object
      dummy.position.set(x, y, z);

      // Rotation follows the wave + mouse influence
      dummy.rotation.x = Math.cos(x + time) * 0.2 + interaction * 1;
      dummy.rotation.z = Math.sin(z + time) * 0.2 + interaction * 1;

      // Scale pulse + mouse hover scale
      const scale = (1 + Math.sin(x * z + time) * 0.1) * (1 + interaction * 0.3);
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, TOTAL]}>
      {/* Reverted to Box as requested, reduced count to 8x8 */}
      <boxGeometry args={[0.65, 0.65, 0.65]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.9}
        transmission={0.5}
        thickness={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      {/* Moved camera back to [14, 10, 14] to ensure the scene fits well */}
      {/* Look at (-8, -2, -4) to shift the object further RIGHT and UP */}
      <PerspectiveCamera makeDefault position={[14, 10, 14]} fov={35} onUpdate={c => c.lookAt(-8, -2, -4)} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />

      <spotLight
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />

      <CrystalWave />

      <Environment preset="city" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[450px] md:h-[550px] lg:h-[600px] relative z-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
