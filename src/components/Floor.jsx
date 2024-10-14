import React, { useMemo } from 'react';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

const Floor = () => {
  const floorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create a gradient for a more realistic floor texture
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#e0e0e0');
    gradient.addColorStop(1, '#d0d0d0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Add some noise for a more natural look
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.02})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    return texture;
  }, []);

  return (
    <Plane args={[20, 20]} rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <meshStandardMaterial map={floorTexture} roughness={0.8} metalness={0.2} />
    </Plane>
  );
};

export default Floor;