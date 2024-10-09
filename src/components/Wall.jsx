import React from 'react';
import * as THREE from 'three';
import { Box, useTexture } from '@react-three/drei';
import textureWall from '../texture-4.jpg';

const Wall = ({ position, rotation, args, isGlass = false }) => {
  const concreteTexture = useTexture(textureWall);
  concreteTexture.wrapS = concreteTexture.wrapT = THREE.RepeatWrapping;
  concreteTexture.repeat.set(args[0] / 2, args[1] / 2);
  
  const randomOffset = Math.random() * 0.1;
  concreteTexture.offset.set(randomOffset, randomOffset);

  return (
    <Box args={args} position={position} rotation={rotation}>
      <meshStandardMaterial 
        color={isGlass ? "#a8c5e0" : "#ffffff"} 
        map={isGlass ? null : concreteTexture}
        transparent={isGlass}
        opacity={isGlass ? 0.2 : 1}
        side={THREE.DoubleSide}
      />
    </Box>
  );
};

export default Wall;