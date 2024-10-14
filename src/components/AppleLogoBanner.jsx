import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import logo from '../assets/apple-banner.png';
import * as THREE from 'three';

const AppleLogoBanner = () => {
  const texture = useLoader(TextureLoader, logo);
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={[0, 4.5, 5.2]} scale={[0.5,0.5,0.5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[3, 1.5]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default AppleLogoBanner;