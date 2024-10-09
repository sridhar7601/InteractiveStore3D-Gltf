import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const RestrictedOrbitControls = () => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      // Limit vertical rotation to prevent going below the floor
      controls.maxPolarAngle = Math.PI / 2;
      // Allow closer approach to tables
      controls.minDistance = 0.5;
      // Limit maximum zoom out to keep within the store
      controls.maxDistance = 40;
    }
  }, []);

  useFrame(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      
      // Allow movement closer to the edges of the store
      controls.target.x = THREE.MathUtils.clamp(controls.target.x, -4.8, 4.8);
      controls.target.z = THREE.MathUtils.clamp(controls.target.z, -4.8, 4.8);
      // Allow looking at objects on the tables
      controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 2);
      
      // Extend the camera movement range slightly
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.8, 4.8);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -4.8, 9);
      // Allow slightly lower camera position to look at tables
      camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.3, 4.8);

      controls.update();
    }
  });

  // Set initial focus point slightly higher to look at tables
  return <OrbitControls ref={controlsRef} target={[0, 1, 0]} />;
};

export default RestrictedOrbitControls;