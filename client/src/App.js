import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './components/navbar.jsx';
import Missions from './pages/missions.jsx';
import Attractions from './pages/attractions.jsx';
import Authentification from './pages/authentification/Authentification.js';
import ComptesAdmin from './pages/admin/ComptesAdmin.js';
import Alertes from './pages/alertes/Alertes.js';

function App() {
  return (
      <Router>
        <Navbar></Navbar>
        <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/admin/comptes" element={<ComptesAdmin />} />
          <Route path="/alertes" element={<Alertes />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;

