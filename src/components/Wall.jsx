import React from 'react';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const Wall = ({ position, rotation, args, isGlass = false }) => {
  const wallTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.03})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(args[0] / 2, args[1] / 2);
    return texture;
  }, [args]);

  return (
    <Box args={args} position={position} rotation={rotation}>
      <meshStandardMaterial 
        color={isGlass ? "#a8c5e0" : "#ffffff"} 
        map={isGlass ? null : wallTexture}
        transparent={isGlass}
        opacity={isGlass ? 0.3 : 1}
        side={THREE.DoubleSide}
        roughness={isGlass ? 0.1 : 0.8}
        metalness={isGlass ? 0.9 : 0.2}
      />
    </Box>
  );
};

export default Wall;