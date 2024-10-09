import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ProductModel = ({ gltfUrl }) => {
  const { scene } = useGLTF(gltfUrl);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      // Keep the original model scale, remove any modification
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      modelRef.current.position.sub(center); // Center the model if needed
    }
  }, [scene]);

  return <primitive ref={modelRef} object={scene} />;
};

const ProductDetailPage = ({ product, onBackToShop }) => {
  const [canvasKey, setCanvasKey] = useState(0); // Track the canvas key state

  if (!product) return null;

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'Price not available';
    }
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const gltfUrl = product.gltf
    ? `http://localhost:3000/uploads/${product.name}/${product.gltf}`
    : null;

  useEffect(() => {
    setCanvasKey((prevKey) => prevKey + 1); // Reset the canvas key on component mount
  }, [product]);

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
            <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={<Html center>Loading 3D model...</Html>}>
              <ProductModel gltfUrl={gltfUrl} />
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
