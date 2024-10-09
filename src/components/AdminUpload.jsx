import React, { useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [modelName, setModelName] = useState('');
  const [gltfFile, setGltfFile] = useState(null);
  const [binFile, setBinFile] = useState(null);
  const [textureFiles, setTextureFiles] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
  const [tableNumber, setTableNumber] = useState(1);
    // const [type, setType] = useState('other');


  const handleModelNameChange = (e) => setModelName(e.target.value);
  const handleGltfChange = (e) => setGltfFile(e.target.files[0]);
  const handleBinChange = (e) => setBinFile(e.target.files[0]);
  const handleTextureChange = (e) => setTextureFiles(e.target.files);
  const handleTableNumberChange = (e) => setTableNumber(parseInt(e.target.value));

  const handlePositionChange = (axis, value) => {
    setPosition(prev => ({ ...prev, [axis]: parseFloat(value) }));
  };

  const handleScaleChange = (axis, value) => {
    setScale(prev => ({ ...prev, [axis]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('modelName', modelName);
    formData.append('gltf', gltfFile);
    formData.append('bin', binFile);
    formData.append('position', JSON.stringify(position));
    formData.append('scale', JSON.stringify(scale));
    formData.append('tableNumber', tableNumber.toString());
  
    Array.from(textureFiles).forEach((file) => {
      formData.append('textures', file);
    });
  
    // Log form data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Files uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
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
          <input type="number" value={position.x} onChange={(e) => handlePositionChange('x', e.target.value)} placeholder="X" />
          <input type="number" value={position.y} onChange={(e) => handlePositionChange('y', e.target.value)} placeholder="Y" />
          <input type="number" value={position.z} onChange={(e) => handlePositionChange('z', e.target.value)} placeholder="Z" />
        </div>
        <div>
          <h3>Scale</h3>
          <input type="number" value={scale.x} onChange={(e) => handleScaleChange('x', e.target.value)} placeholder="X" />
          <input type="number" value={scale.y} onChange={(e) => handleScaleChange('y', e.target.value)} placeholder="Y" />
          <input type="number" value={scale.z} onChange={(e) => handleScaleChange('z', e.target.value)} placeholder="Z" />
        </div>
        <div>
          <label>Table Number (1-9):</label>
          <input type="number" min="1" max="9" value={tableNumber} onChange={handleTableNumberChange} required />
        </div>
        <button type="submit">Upload Files</button>
      </form>
    </div>
  );
};

export default AdminUpload;