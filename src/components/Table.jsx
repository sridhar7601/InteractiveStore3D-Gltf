import React from 'react';
import { Box } from '@react-three/drei';

const Table = ({ position }) => (
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
  </group>
);

export default Table;