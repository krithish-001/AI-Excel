'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CubeGrid from './CubeGrid';
import FormulaPopEffect from './FormulaPopEffect';

export default function Scene({ formulaPopRef }) {
  const cubePopRef = useRef(null);

  return (
    <div className="fixed inset-0 z-0" style={{ opacity: 0.25 }} id="three-canvas">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 200,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={0.3} />
        <fog attach="fog" args={['#000000', 10, 80]} />
        <CubeGrid onFormulaPopRef={cubePopRef} />
        <FormulaPopEffect triggerRef={formulaPopRef} />
      </Canvas>
    </div>
  );
}
