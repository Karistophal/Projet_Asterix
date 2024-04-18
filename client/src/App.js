import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.js';
import Navbar from './components/navbar.jsx';
import Attractions from './pages/attractions.jsx';

function App() {
  return (
      <Router>
        <Navbar></Navbar>
        <div className='app'>
        <Routes>
          <Route path="/attractions" element={<Attractions />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;

