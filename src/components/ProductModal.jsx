import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Product from './Product';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <button onClick={onClose} style={{ alignSelf: 'flex-end' }}>X</button>
        <h2>{product.name}</h2>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '50%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Product productData={product} tablePosition={[0, 0, 0]} />
              <OrbitControls />
            </Canvas>
          </div>
          <div style={{ width: '50%', padding: '20px' }}>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>Cost:</strong> ${product.cost}</p>
            <p><strong>Description:</strong> {product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;