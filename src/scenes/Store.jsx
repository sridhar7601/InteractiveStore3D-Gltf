import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useControls } from 'leva';
import Floor from '../components/Floor';
import Table from '../components/Table';
import Wall from '../components/Wall';
import RestrictedOrbitControls from '../components/RestrictedOrbitControls';
import MobileStand from '../components/MobileStand';

const Store = () => {
  const [products, setProducts] = useState([]);

  const { ambientIntensity, pointIntensity } = useControls({
    ambientIntensity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    pointIntensity: { value: 1, min: 0, max: 2, step: 0.1 },
  });

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {setProducts(data)})
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Define fixed table positions
  const tablePositions = [
    [-2.5, 0, -2.5],
    [2.5, 0, -2.5],
    [-2.5, 0, 2.5],
    [2.5, 0, 2.5],
    [0, 0, 0],
    [-2.5, 0, 0],
    [2.5, 0, 0],
    [0, 0, -2.5],
    [0, 0, 2.5],
  ];

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <color attach="background" args={['#e0e0e0']} />
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[5, 5, 5]} intensity={pointIntensity} />
      <pointLight position={[-5, 5, -5]} intensity={pointIntensity} />

      <Floor />

      {/* Walls */}
      <Wall position={[0, 2.5, -5]} args={[10, 5, 0.2]} />
      <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />
      <Wall position={[5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} />

      {/* Ceiling */}
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

      {/* Tables with Products */}
      {tablePositions.map((position, index) => {
        const tableNumber = index + 1;
        const tableProducts = products.filter(p => p.tableNumber === tableNumber).slice(0, 4);
        return (
          <Table 
            key={`table-${tableNumber}`}
            position={position}
            products={tableProducts}
          />
        );
      })}

      {/* Mobile Stands */}
      {products.filter(p => p.type === 'mobile').map((mobileProduct, index) => (
        <MobileStand
          key={`mobile-stand-${index}`}
          position={tablePositions[mobileProduct.tableNumber - 1]}
          productData={mobileProduct}
        />
      ))}

      <RestrictedOrbitControls />
    </Canvas>
  );
};

export default Store;