import React, { useMemo } from 'react';
import { Plane } from '@react-three/drei';
import { createGreyTileTexture } from '../utils/textures';
import * as THREE from 'three';
const Floor = () => {
  const floorTexture = useMemo(() => createGreyTileTexture(), []);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);

  return (
    <Plane args={[10, 10]} rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <meshStandardMaterial 
        map={floorTexture} 
        roughness={0.8}
        metalness={0.2}
      />
    </Plane>
  );
};

export default Floor;