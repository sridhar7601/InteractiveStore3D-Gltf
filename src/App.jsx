import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './scenes/Store';
import AdminUpload from './components/AdminUpload';

function App() {
  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Routes>
          {/* Route for AdminUpload */}
          <Route path="/admin" element={<AdminUpload />} />
          {/* Route for Store */}
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;