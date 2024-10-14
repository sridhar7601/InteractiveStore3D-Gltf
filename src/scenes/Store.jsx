import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useControls } from 'leva';
import Floor from '../components/Floor';
import Table from '../components/Table';
import Wall from '../components/Wall';
import ProductDetailPage from '../components/ProductDetailPage';
import LightRig from '../components/LightRig';
import RestrictedOrbitControls from '../components/RestrictedOrbitControls';
import AppleLogoBanner from '../components/AppleLogoBanner';
import WallLight from '../components/WallLight';
import FocusLight from '../components/FocusLight';
import * as THREE from 'three';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(null);

  const { ambientIntensity, pointIntensity } = useControls({
    ambientIntensity: { value: 0.3, min: 0, max: 1, step: 0.1 },
    pointIntensity: { value: 0.7, min: 0, max: 2, step: 0.1 },
  });

  useEffect(() => {
    // Fetch products only once
    fetch('http://3d.raghavendiran.cloud/products/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched products:', data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
      });
  }, []);

  const tablePositions = [
    [-3, 0, -3],
    [0, 0, -3],
    [3, 0, -3],
    [-3, 0, 0],
    [0, 0, 0],
    [3, 0, 0],
    [-3, 0, 3],
    [0, 0, 3],
    [3, 0, 3],
  ];

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleBackToShop = useCallback(() => {
    setSelectedProduct(null);
    setKey(prevKey => prevKey + 1);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onBackToShop={handleBackToShop} />;
  }

  return (
    <Canvas key={key} camera={{ position: [0, 15, 25], fov: 60 }} shadows>
      <color attach="background" args={['#f0f0f0']} />
      <Suspense fallback={null}>
        <LightRig ambientIntensity={ambientIntensity} pointIntensity={pointIntensity} />

        <Floor />

        {/* Walls */}
        <Wall position={[0, 2.5, -5]} args={[10, 5, 0.2]} />
        <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />
        <Wall position={[5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />
        <Wall position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} args={[10, 10, 0.2]} />

        {/* Glass Front */}
        <Wall position={[-3.75, 2.5, 5]} args={[2.5, 5, 0.05]} isGlass={true} />
        <Wall position={[3.75, 2.5, 5]} args={[2.5, 5, 0.05]} isGlass={true} />
        <Wall position={[0, 4.5, 5]} args={[5, 1, 0.05]} isGlass={true} />

        {/* Door Frame */}
        <Box args={[0.1, 5, 0.1]} position={[-1.25, 2.5, 5]}>
          <meshStandardMaterial color="#4a3728" />
        </Box>
        <Box args={[0.1, 5, 0.1]} position={[1.25, 2.5, 5]}>
          <meshStandardMaterial color="#4a3728" />
        </Box>

        {/* Apple Logo Banner */}
        <AppleLogoBanner />

        {/* Wall Lights */}
        <WallLight position={[-4.9, 3, -4.8]} rotation={[0, Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />
        <WallLight position={[-4.9, 3, 0]} rotation={[0, -Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />
        <WallLight position={[-4.9, 3, 4.8]} rotation={[0, Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />

        <WallLight position={[4.9, 3, -4.8]} rotation={[0, -Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />
        <WallLight position={[4.9, 3, 0]} rotation={[0, -Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />
        <WallLight position={[4.9, 3, 4.8]} rotation={[0, -Math.PI / 2, 0]} color="#fff5e6" intensity={0.8} />

        {/* Tables and Products */}
        {tablePositions.map((tablePosition, index) => (
        <Table 
          key={index} 
          position={tablePosition} 
          products={products.filter(product => product.tableNumber === index + 1)} 
          onProductClick={handleProductClick} 
        />
      ))}

        {/* Ground Lighting */}
        <FocusLight position={[0, 4.9, 0]} intensity={1.5} />
        <RestrictedOrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Store;
