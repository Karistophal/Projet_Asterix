import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authentification from './pages/Authentification';


function App() {
  return (
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/list" element={""} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;

