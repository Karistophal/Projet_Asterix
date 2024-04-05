import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './pages/home/Home.js';
import Navbar from './components/navbar.jsx';
import Authentification from './pages/authentification/Authentification.js';


function App() {
  return (
      <Router>
        <Navbar></Navbar>
        <div className='app'>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/auth" element={<Authentification />} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;

