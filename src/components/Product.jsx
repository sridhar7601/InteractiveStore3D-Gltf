import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Product = ({ productData, tablePosition ,onProductClick}) => {
  if (!productData || !productData.name || !productData.gltf) {
    console.error('Invalid product data:', productData);
    return null;
  }

  const { name, gltf, textures, scale, position, type, price, description } = productData;
  const gltfUrl = `http://3d.raghavendiran.cloud/products/uploads/${name}/${gltf}`;
  
  const { scene } = useGLTF(gltfUrl);
  const groupRef = useRef();

  useEffect(() => {
    console.log('Model loaded:', scene);
    scene.traverse((child) => {
      if (child.isMesh) {
        if (textures && Array.isArray(textures)) {
          textures.forEach(texture => {
            const textureUrl = `http://3d.raghavendiran.cloud/products/uploads/${name}/textures/${texture}`;
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
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });
  // Calculate the final position by adding the product's position to the table's position
  const finalPosition = [
     position.x,
    position.y,
    position.z
  ];
  const handleClick = (event) => {
    event.stopPropagation();
    onProductClick({ name, type, price, description, gltf });
  };

  return (
    <group 
      ref={groupRef} 
      position={finalPosition}
      scale={[scale.x, scale.y, scale.z]}
      onClick={handleClick}

    >
      <primitive object={scene} />
    </group>
  );
};

export default Product;




// import React, { useEffect, useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const S3_BUCKET_URL = 'https://your-bucket-name.s3.your-region.amazonaws.com';

// const Product = ({ productData, tablePosition, onProductClick }) => {
//   if (!productData || !productData.name || !productData.gltf) {
//     console.error('Invalid product data:', productData);
//     return null;
//   }

//   const { name, gltf, textures, scale, position, type, price, description } = productData;
//   const gltfUrl = `${S3_BUCKET_URL}/${name}/${gltf}`;
  
//   const { scene } = useGLTF(gltfUrl);
//   const groupRef = useRef();

//   useEffect(() => {
//     console.log('Model loaded:', scene);
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         if (textures && Array.isArray(textures)) {
//           textures.forEach(texture => {
//             const textureUrl = `${S3_BUCKET_URL}/${name}/textures/${texture}`;
//             if (texture.includes('baseColor')) {
//               child.material.map = new THREE.TextureLoader().load(textureUrl);
//             } else if (texture.includes('normal')) {
//               child.material.normalMap = new THREE.TextureLoader().load(textureUrl);
//             } else if (texture.includes('metallicRoughness')) {
//               const metallicRoughnessTexture = new THREE.TextureLoader().load(textureUrl);
//               child.material.metalnessMap = metallicRoughnessTexture;
//               child.material.roughnessMap = metallicRoughnessTexture;
//             }
//           });
//         }
//         child.material.needsUpdate = true;
//       }
//     });
//   }, [scene, name, textures]);

//   useFrame((state, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += delta * 0.5;
//     }
//   });

//   const finalPosition = [
//     position.x,
//     position.y,
//     position.z
//   ];

//   const handleClick = (event) => {
//     event.stopPropagation();
//     onProductClick({ name, type, price, description, gltf });
//   };

//   return (
//     <group 
//       ref={groupRef} 
//       position={finalPosition}
//       scale={[scale.x, scale.y, scale.z]}
//       onClick={handleClick}
//     >
//       <primitive object={scene} />
//     </group>
//   );
// };

// export default Product;