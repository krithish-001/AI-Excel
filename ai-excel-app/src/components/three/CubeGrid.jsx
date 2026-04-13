'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SYMBOLS = ['+', '−', '×', '÷', '√', 'Σ', '∫', 'π', 'Δ', '∞'];
const FUNCTIONS = ['SUMIFS', 'VLOOKUP', 'XLOOKUP', 'INDEX', 'MATCH', 'IF', 'COUNTIF', 'AVERAGEIF', 'IFERROR', 'OFFSET'];
const ALL_LABELS = [...SYMBOLS, ...FUNCTIONS];
const COUNT = 250;
const DEPTH = 80;
const SPREAD_X = 40;
const SPREAD_Y = 25;

function createTextTexture(text, isFunction) {
  const canvas = document.createElement('canvas');
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  // Subtle border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(2, 2, size - 4, size - 4);

  // Text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isFunction) {
    ctx.font = `bold ${Math.floor(size / (text.length > 5 ? 7 : 5))}px monospace`;
  } else {
    ctx.font = `${Math.floor(size / 3)}px monospace`;
  }

  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CubeGrid({ onFormulaPopRef }) {
  const meshRef = useRef();
  const { mouse } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speedRef = useRef(1);

  // Create cube data
  const cubeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < COUNT; i++) {
      data.push({
        x: (Math.random() - 0.5) * SPREAD_X,
        y: (Math.random() - 0.5) * SPREAD_Y,
        z: -Math.random() * DEPTH,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        speed: 0.02 + Math.random() * 0.04,
        scale: 0.3 + Math.random() * 0.7,
        labelIndex: Math.floor(Math.random() * ALL_LABELS.length),
      });
    }
    return data;
  }, []);

  // Create textures for each label
  const textures = useMemo(() => {
    return ALL_LABELS.map((label, i) => createTextTexture(label, i >= SYMBOLS.length));
  }, []);

  // Create materials array
  const materials = useMemo(() => {
    return textures.map(
      (tex) =>
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
    );
  }, [textures]);

  // Expose pop callback
  useEffect(() => {
    if (onFormulaPopRef) {
      onFormulaPopRef.current = () => {
        speedRef.current = 4;
        setTimeout(() => {
          speedRef.current = 1;
        }, 1500);
      };
    }
  }, [onFormulaPopRef]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouseInfluence = {
      x: mouse.x * 0.3,
      y: mouse.y * 0.2,
    };

    for (let i = 0; i < COUNT; i++) {
      const cube = cubeData[i];

      // Move toward camera
      cube.z += cube.speed * speedRef.current;

      // Reset when past camera
      if (cube.z > 5) {
        cube.z = -DEPTH;
        cube.x = (Math.random() - 0.5) * SPREAD_X;
        cube.y = (Math.random() - 0.5) * SPREAD_Y;
        cube.labelIndex = Math.floor(Math.random() * ALL_LABELS.length);
      }

      // Rotation
      cube.rotX += cube.rotSpeedX;
      cube.rotY += cube.rotSpeedY;

      // Position with parallax
      dummy.position.set(
        cube.x + mouseInfluence.x * (cube.z / DEPTH + 1) * 2,
        cube.y + mouseInfluence.y * (cube.z / DEPTH + 1) * 2,
        cube.z
      );

      dummy.rotation.set(cube.rotX, cube.rotY, 0);
      dummy.scale.setScalar(cube.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Use a single white material for the instanced mesh geometry edges,
  // and overlay each cube with its own label via a second pass
  // For performance, use a single shared material with semi-transparency
  return (
    <group>
      {/* Instanced cube wireframes */}
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          wireframe
        />
      </instancedMesh>

      {/* Floating symbol planes — we render a subset for performance */}
      <FloatingSymbols cubeData={cubeData} materials={materials} mouse={mouse} speedRef={speedRef} />
    </group>
  );
}

function FloatingSymbols({ cubeData, materials, mouse, speedRef }) {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const VISIBLE = Math.min(80, cubeData.length); // Limit rendered label planes

  useFrame(() => {
    for (let i = 0; i < VISIBLE; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const cube = cubeData[i];

      const mouseInfluence = {
        x: mouse.x * 0.3,
        y: mouse.y * 0.2,
      };

      mesh.position.set(
        cube.x + mouseInfluence.x * (cube.z / DEPTH + 1) * 2,
        cube.y + mouseInfluence.y * (cube.z / DEPTH + 1) * 2,
        cube.z
      );

      // Fade based on depth
      const depthFactor = Math.max(0, 1 - Math.abs(cube.z) / DEPTH);
      mesh.material.opacity = depthFactor * 0.6;

      // Assign correct texture
      const tex = materials[cube.labelIndex]?.map;
      if (tex && mesh.material.map !== tex) {
        mesh.material.map = tex;
        mesh.material.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: VISIBLE }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
        >
          <planeGeometry args={[1.2, 1.2]} />
          <meshBasicMaterial
            transparent
            opacity={0.5}
            depthWrite={false}
            map={materials[cubeData[i]?.labelIndex]?.map || null}
          />
        </mesh>
      ))}
    </group>
  );
}
