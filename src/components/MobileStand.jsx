import React from 'react';
import { useGLTF } from '@react-three/drei';

const MobileStand = ({ position, productData }) => {
  const { scene } = useGLTF(`http://localhost:3000/uploads/${productData.name}/${productData.gltf}`);

  return (
    <group position={position}>
      <primitive 
        object={scene} 
        scale={[productData.scale.x, productData.scale.y, productData.scale.z]}
        position={[productData.position.x, productData.position.y + 0.75, productData.position.z]}
      />
    </group>
  );
};

export default MobileStand;