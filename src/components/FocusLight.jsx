
import React from 'react';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

const FocusLight = ({ position, target, color = "#ffffff", intensity = 1 }) => {
  return (
    <group position={position}>
      <SpotLight
        castShadow
        intensity={intensity}
        angle={Math.PI / 8}
        penumbra={0.2}
        distance={20}
        color={color}
        position={[0, 0, 0]}
        target-position={target}
      />
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
};

export default FocusLight;