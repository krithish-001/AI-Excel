'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const POP_COUNT = 30;
const SYMBOLS = ['+', '−', '×', '÷', '√', 'Σ', '∫'];

export default function FormulaPopEffect({ triggerRef }) {
  const groupRef = useRef();
  const particlesRef = useRef([]);
  const activeRef = useRef(false);
  const timeRef = useRef(0);

  // Create particle data
  const particles = useMemo(() => {
    return Array.from({ length: POP_COUNT }).map(() => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      ),
      position: new THREE.Vector3(0, 0, 0),
      opacity: 0,
      scale: 0,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    }));
  }, []);

  // Expose trigger function
  if (triggerRef) {
    triggerRef.current = () => {
      activeRef.current = true;
      timeRef.current = 0;

      particles.forEach((p) => {
        p.position.set(0, 0, 5);
        p.velocity.set(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.2 - 0.1
        );
        p.opacity = 1;
        p.scale = 0.3 + Math.random() * 0.5;
      });
    };
  }

  useFrame((state, delta) => {
    if (!activeRef.current) return;

    timeRef.current += delta;

    if (timeRef.current > 2.5) {
      activeRef.current = false;
      particles.forEach((p) => {
        p.opacity = 0;
      });
    }

    particles.forEach((p, i) => {
      const mesh = particlesRef.current[i];
      if (!mesh) return;

      p.position.add(p.velocity.clone().multiplyScalar(delta * 2));
      p.velocity.y -= delta * 0.05; // gravity
      p.opacity = Math.max(0, p.opacity - delta * 0.4);

      mesh.position.copy(p.position);
      mesh.material.opacity = p.opacity;
      mesh.scale.setScalar(p.scale * (1 + timeRef.current * 0.3));
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          position={[0, 0, -100]}
        >
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
