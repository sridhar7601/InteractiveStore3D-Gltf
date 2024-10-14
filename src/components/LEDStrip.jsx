import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Cylinder, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const LEDStrip = ({ position, rotation, length, width, color, intensity }) => {
  const { scene } = useThree();
  
  const lightRef = useMemo(() => {
    const light = new THREE.RectAreaLight(color, intensity, length, width);
    light.position.set(...position);
    light.rotation.set(...rotation);
    scene.add(light);
    return light;
  }, [scene, color, intensity, length, width, position, rotation]);

  return (
    <group position={position} rotation={rotation}>
      <Cylinder args={[width / 2, width / 2, length, 32]} rotation={[0, 0, Math.PI / 2]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={1}
        />
      </Cylinder>
    </group>
  );
};

const LightRig = ({ ambientIntensity, pointIntensity }) => {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[5, 10, 5]} intensity={pointIntensity * 0.5} />
      <pointLight position={[-5, 10, -5]} intensity={pointIntensity * 0.5} />

      {/* Innovative LED Setup */}
      <LEDStrip
        position={[0, 4.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        length={9}
        width={0.2}
        color="#ffffff"
        intensity={5}
      />
      <LEDStrip
        position={[-4.9, 2.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={5}
        width={0.2}
        color="#ffffff"
        intensity={3}
      />
      <LEDStrip
        position={[4.9, 2.5, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        length={5}
        width={0.2}
        color="#ffffff"
        intensity={3}
      />

      {/* Additional accent lighting */}
      <spotLight
        position={[0, 4.8, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#f0f0ff"
      />
    </>
  );
};

export default LightRig;