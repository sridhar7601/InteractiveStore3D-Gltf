import React, { useState, useRef, Suspense } from 'react';
import axios from 'axios';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls, TransformControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const PreviewModel = ({ file, position, scale, setPosition, setScale }) => {
  const { scene } = useGLTF(URL.createObjectURL(file));
  const groupRef = useRef();
  const { camera, gl } = useThree();

  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(position.x, position.y, position.z);
      groupRef.current.scale.set(scale.x, scale.y, scale.z);
    }
  }, [position, scale]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
      <TransformControls object={groupRef} mode="translate" onObjectChange={(e) => {
        setPosition({
          x: e.target.object.position.x,
          y: e.target.object.position.y,
          z: e.target.object.position.z
        });
      }} />
      <TransformControls object={groupRef} mode="scale" onObjectChange={(e) => {
        setScale({
          x: e.target.object.scale.x,
          y: e.target.object.scale.y,
          z: e.target.object.scale.z
        });
      }} />
    </group>
  );
};

const AdminUpload = () => {
  const [modelName, setModelName] = useState('');
  const [gltfFile, setGltfFile] = useState(null);
  const [binFile, setBinFile] = useState(null);
  const [textureFiles, setTextureFiles] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
  const [tableNumber, setTableNumber] = useState(1);
  const [type, setType] = useState('other');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleModelNameChange = (e) => setModelName(e.target.value);
  const handleGltfChange = (e) => setGltfFile(e.target.files[0]);
  const handleBinChange = (e) => setBinFile(e.target.files[0]);
  const handleTextureChange = (e) => setTextureFiles(e.target.files);
  const handleTableNumberChange = (e) => setTableNumber(parseInt(e.target.value));
  const handleTypeChange = (e) => setType(e.target.value);
  const handlePriceChange = (e) => setPrice(parseFloat(e.target.value));
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('modelName', modelName);
    formData.append('gltf', gltfFile);
    formData.append('bin', binFile);
    formData.append('position', JSON.stringify(position));
    formData.append('scale', JSON.stringify(scale));
    formData.append('tableNumber', tableNumber.toString());
    formData.append('type', type);
    formData.append('price', price.toString());
    formData.append('description', description);
  
    Array.from(textureFiles).forEach((file) => {
      formData.append('textures', file);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Files uploaded successfully!');
      console.log(response.data);
      // Reset form fields here if needed
    } catch (error) {
      // console.error('Error uploading files:', error);
      alert('Failed to upload files');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1>Admin Upload</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Model Name:</label>
            <input type="text" value={modelName} onChange={handleModelNameChange} required />
          </div>
          <div>
            <label>GLTF File:</label>
            <input type="file" accept=".gltf" onChange={handleGltfChange} required />
          </div>
          <div>
            <label>BIN File:</label>
            <input type="file" accept=".bin" onChange={handleBinChange} required />
          </div>
          <div>
            <label>Textures (Multiple):</label>
            <input type="file" multiple onChange={handleTextureChange} />
          </div>
          <div>
            <h3>Position</h3>
            <input type="number" value={position.x} onChange={(e) => setPosition({...position, x: parseFloat(e.target.value)})} placeholder="X" />
            <input type="number" value={position.y} onChange={(e) => setPosition({...position, y: parseFloat(e.target.value)})} placeholder="Y" />
            <input type="number" value={position.z} onChange={(e) => setPosition({...position, z: parseFloat(e.target.value)})} placeholder="Z" />
          </div>
          <div>
            <h3>Scale</h3>
            <input type="number" value={scale.x} onChange={(e) => setScale({...scale, x: parseFloat(e.target.value)})} placeholder="X" />
            <input type="number" value={scale.y} onChange={(e) => setScale({...scale, y: parseFloat(e.target.value)})} placeholder="Y" />
            <input type="number" value={scale.z} onChange={(e) => setScale({...scale, z: parseFloat(e.target.value)})} placeholder="Z" />
          </div>
          <div>
            <label>Table Number (1-9):</label>
            <input type="number" min="1" max="9" value={tableNumber} onChange={handleTableNumberChange} required />
          </div>
          <div>
            <label>Type:</label>
            <select value={type} onChange={handleTypeChange}>
              <option value="mobile">Mobile</option>
              <option value="mac">Mac</option>
              <option value="vision">Vision</option>
              <option value="watch">Watch</option>
              <option value="ipad">iPad</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Price ($):</label>
            <input type="number" step="0.01" value={price} onChange={handlePriceChange} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={handleDescriptionChange} />
          </div>
          <button type="submit">Upload Model</button>
        </form>
      </div>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* <Suspense fallback={<Html>Loading 3D preview...</Html>}>
            {gltfFile && (
              <PreviewModel 
                file={gltfFile}
                position={position}
                scale={scale}
                setPosition={setPosition}
                setScale={setScale}
              />
            )}
          </Suspense> */}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default AdminUpload;