import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './components/navbar.jsx';


function App() {
  return (
      <Router>
        <Navbar></Navbar>
        <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      </Router>
  );
}

export default App;

