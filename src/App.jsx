import React from 'react';
import Store from './scenes/Store';
import AdminUpload from './components/AdminUpload';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
            <AdminUpload />

      <Store /> 

    </div>
  );
}

export default App;