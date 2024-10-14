import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';

const ProductModel = ({ gltfUrl, position, rotation, scale }) => {
  const { scene } = useGLTF(gltfUrl);
  const modelRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
      modelRef.current.rotation.set(...rotation);
      modelRef.current.scale.set(...scale);
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      
      camera.position.set(center.x, center.y, center.z + cameraZ);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }
  }, [scene, camera]);

  return <primitive ref={modelRef} object={scene} />;
};

const ProductDetailPage = ({ product, onBackToShop }) => {
  const [canvasKey, setCanvasKey] = useState(0);

  const { position, rotation, scale } = useControls({
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, Math.PI / 4, 0], step: 0.1 },
    scale: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
  });

  useEffect(() => {
    setCanvasKey((prevKey) => prevKey + 1);
  }, [product]);

  if (!product) return null;

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'Price not available';
    }
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const gltfUrl = product.gltf
    ? `http://3d.raghavendiran.cloud/products/uploads/${product.name}/${product.gltf}`
    : null;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>{product.name || 'Unnamed Product'}</h1>
        <p><strong>Type:</strong> {product.type || 'Not specified'}</p>
        <p><strong>Price:</strong> {formatPrice(product.price)}</p>
        <p><strong>Description:</strong> {product.description || 'No description available'}</p>
        <button onClick={onBackToShop} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Back to Shop
        </button>
      </div>
      <div style={{ flex: 1 }}>
        {gltfUrl ? (
          <Canvas key={canvasKey} style={{ width: '100%', height: '100%' }}>
            <PerspectiveCamera makeDefault fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={<Html center>Loading 3D model...</Html>}>
              <ProductModel 
                gltfUrl={gltfUrl}
                position={position}
                rotation={rotation}
                scale={[scale, scale, scale]}
              />
            </Suspense>
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              panSpeed={0.5}
              zoomSpeed={0.5}
              rotateSpeed={0.5}
              dampingFactor={0.1}
              enableDamping={true}
            />
          </Canvas>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            No 3D model available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;