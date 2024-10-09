import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Product = ({ productData, tablePosition }) => {
  if (!productData || !productData.name || !productData.gltf) {
    console.error('Invalid product data:', productData);
    return null;
  }

  const { name, gltf, textures, scale, position } = productData;
  const gltfUrl = `http://localhost:3000/uploads/${name}/${gltf}`;
  
  const { scene } = useGLTF(gltfUrl);
  const groupRef = useRef();

  useEffect(() => {
    console.log('Model loaded:', scene);
    scene.traverse((child) => {
      if (child.isMesh) {
        if (textures && Array.isArray(textures)) {
          textures.forEach(texture => {
            const textureUrl = `http://localhost:3000/uploads/${name}/textures/${texture}`;
            if (texture.includes('baseColor')) {
              child.material.map = new THREE.TextureLoader().load(textureUrl);
            } else if (texture.includes('normal')) {
              child.material.normalMap = new THREE.TextureLoader().load(textureUrl);
            } else if (texture.includes('metallicRoughness')) {
              const metallicRoughnessTexture = new THREE.TextureLoader().load(textureUrl);
              child.material.metalnessMap = metallicRoughnessTexture;
              child.material.roughnessMap = metallicRoughnessTexture;
            }
          });
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, name, textures]);

  // Calculate the final position by adding the product's position to the table's position
  const finalPosition = [
     position.x,
    position.y,
    position.z
  ];

  return (
    <group 
      ref={groupRef} 
      position={finalPosition}
      scale={[scale.x, scale.y, scale.z]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Product;