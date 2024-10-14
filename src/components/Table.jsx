import React from 'react';
import { Box } from '@react-three/drei';
import Product from './Product';

const Table = ({ position, products, onProductClick }) => {
  return (
    <group position={position}>
      {/* Table top */}
      <Box args={[2, 0.05, 1.2]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </Box>
      {/* Table legs - adjusted to be more inside the table top */}
      {[[-0.9, -0.45], [0.9, -0.45], [-0.9, 0.45], [0.9, 0.45]].map((leg, index) => (
        <Box key={index} args={[0.05, 1.5, 0.05]} position={[leg[0], 0, leg[1]]}>
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.1} />
        </Box>
      ))}
      {products.map((product, index) => (
        <Product 
          key={`product-${product.name}-${index}`}
          productData={product}
          tablePosition={position}
          onProductClick={onProductClick}
        />
      ))}
    </group>
  );
};

export default Table;