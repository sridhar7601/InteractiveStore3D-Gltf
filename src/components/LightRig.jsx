import React from 'react';
import { SpotLight } from '@react-three/drei';

function TubeLEDLight({ position, rotation, length, intensity, color }) {
  return (
    <group position={position} rotation={rotation}>
      <SpotLight
        castShadow
        intensity={intensity}
        angle={Math.PI / 2}
        penumbra={0.5}
        position={[0, 0, 0]}
        color={color}
      />
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, length, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

const LightRig = ({ ambientIntensity, pointIntensity }) => {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[5, 10, 5]} intensity={pointIntensity} />
      <pointLight position={[-5, 10, -5]} intensity={pointIntensity} />

      {/* Ceiling LED light */}
      <TubeLEDLight
        position={[0, 4.9, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={9}
        intensity={5}
        color="#ffffff"
      />

      {/* Side wall LED lights */}
      <TubeLEDLight
        position={[-4.9, 2.5, 0]}
        rotation={[0, 0, 0]}
        length={5}
        intensity={3}
        color="#ffffff"
      />
      <TubeLEDLight
        position={[4.9, 2.5, 0]}
        rotation={[0, 0, 0]}
        length={5}
        intensity={3}
        color="#ffffff"
      />
    </>
  );
};

export default LightRig;