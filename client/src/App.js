import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';


function App() {
  return (
      <Router>
        <Navbar />
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={""} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;

