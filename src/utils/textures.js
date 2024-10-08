import * as THREE from 'three';

export const createGreyTileTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);
  
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const brightness = Math.random() * 10 - 5;
    ctx.fillStyle = `rgb(${128 + brightness},${128 + brightness},${128 + brightness})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return new THREE.CanvasTexture(canvas);
};