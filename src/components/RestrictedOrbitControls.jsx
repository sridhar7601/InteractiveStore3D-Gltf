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
      controls.maxPolarAngle = Math.PI / 2;
      controls.minDistance = 1;
      controls.maxDistance = 10;
    }
  }, []);

  useFrame(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      
      controls.target.x = THREE.MathUtils.clamp(controls.target.x, -4.5, 4.5);
      controls.target.z = THREE.MathUtils.clamp(controls.target.z, -4.5, 4.5);
      controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 4.5);
      
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.5, 4.5);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -4.5, 9);
      camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.5, 4.5);

      controls.update();
    }
  });

  return <OrbitControls ref={controlsRef} target={[0, 1.5, 0]} />;
};

export default RestrictedOrbitControls;