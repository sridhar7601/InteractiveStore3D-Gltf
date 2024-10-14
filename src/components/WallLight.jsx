import React from 'react';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

const WallLight = ({ position, rotation, color = "#ffffff", intensity = 1 }) => {
  return (
    <group position={position} rotation={rotation}>
      <SpotLight
        castShadow
        intensity={intensity}
        angle={Math.PI / 6}
        penumbra={0.5}
        distance={10}
        color={color}
        position={[0, 0, 0]}
        target-position={[0, -1, 0]}
      />
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 32]} />
        <meshStandardMaterial color="#333333" emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default WallLight;