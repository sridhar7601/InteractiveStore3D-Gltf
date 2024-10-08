import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useControls } from 'leva';
import Floor from '../components/Floor';
import Table from '../components/Table';
import Wall from '../components/Wall';
import RestrictedOrbitControls from '../components/RestrictedOrbitControls';

const Store = () => {
  const { ambientIntensity, pointIntensity } = useControls({
    ambientIntensity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    pointIntensity: { value: 1, min: 0, max: 2, step: 0.1 },
  });

  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 60 }}>
      <color attach="background" args={['#e0e0e0']} />
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[5, 5, 5]} intensity={pointIntensity} />
      <pointLight position={[-5, 5, -5]} intensity={pointIntensity} />

      <Floor />

      {/* Walls */}
      <Wall position={[0, 2.5, -5]} args={[10, 5, 0.2]} />
      <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />
      <Wall position={[5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />

      {/* Ceiling */}
      <Wall position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} args={[10, 10, 0.2]} />

      {/* Glass Front */}
      <Wall position={[-3.75, 2.5, 5]} args={[2.5, 5, 0.05]} isGlass={true} />
      <Wall position={[3.75, 2.5, 5]} args={[2.5, 5, 0.05]} isGlass={true} />
      <Wall position={[0, 4.5, 5]} args={[5, 1, 0.05]} isGlass={true} />

      {/* Door Frame */}
      <Box args={[0.1, 5, 0.1]} position={[-1.25, 2.5, 5]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>
      <Box args={[0.1, 5, 0.1]} position={[1.25, 2.5, 5]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>

      {/* Tables */}
      <Table position={[-2.5, 0, -2.5]} />
      <Table position={[2.5, 0, -2.5]} />
      <Table position={[-2.5, 0, 2.5]} />
      <Table position={[2.5, 0, 2.5]} />

      <RestrictedOrbitControls />
    </Canvas>
  );
};

export default Store;