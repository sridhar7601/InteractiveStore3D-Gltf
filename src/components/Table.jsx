import React from 'react';
import { Box } from '@react-three/drei';
import Product from './Product';

const Table = ({ position, products, onProductClick }) => {
  return (
    <group position={position}>
      <Box args={[1.5, 0.05, 1]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </Box>
      <Box args={[0.1, 0.75, 0.1]} position={[-0.65, 0.375, -0.4]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.1} />
      </Box>
      <Box args={[0.1, 0.75, 0.1]} position={[0.65, 0.375, -0.4]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.1} />
      </Box>
      <Box args={[0.1, 0.75, 0.1]} position={[-0.65, 0.375, 0.4]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.1} />
      </Box>
      <Box args={[0.1, 0.75, 0.1]} position={[0.65, 0.375, 0.4]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.1} />
      </Box>
      {products.map((product, index) => (
        <Product 
          key={`product-${product.name}-${index}`}
          productData={product}
          tablePosition={position}
          onProductClick={onProductClick}  // Pass the onProductClick prop here
        />
      ))}
    </group>
  );
};

export default Table;