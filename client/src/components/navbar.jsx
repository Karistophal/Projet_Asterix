import React from 'react';
import '../assets/styles/navbar.css';
import { useState, useEffect } from 'react';
import LogoAsterix from '../assets/images/logo_asterix.png';
import Loupe from '../assets/images/loupe_logo-removebg-preview.png';
import LogoProfile from '../assets/images/profile_logo-removebg-preview.png'


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token-info'));

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload(); // Recharge la page actuelle
  };
  

  // Mettez à jour l'état isLoggedIn lorsque le composant est monté
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);
    return (
      <nav className='nav-container'>
        <ul>
            <li>
                <img src={LogoAsterix} alt="" className='logo-asterix' />
                <a href="/" className='link'>Accueil</a>
                <a href="/attractions" className='link'>Attractions</a>
                <a href="/"className='link'>Aide</a>
                <a href="/"className='link'>Contact</a>
                {isLoggedIn && (
              <>
                <a href="/profile"><div className='link'>Missions</div></a>
                <a href="/settings"><div className='link'>Alerte</div></a>
                {/* Ajoutez autant de champs supplémentaires que vous le souhaitez */}
              </>
            )}
                <div className='search-bar'>
                <img src={LogoProfile} alt="" className='logo-profile'/>
                <img src={Loupe} alt="" className='search-icon'/>
                <a href="/auth"><div className='btn_cnnx'>Connexion</div></a>
                {isLoggedIn && (
              <>
                <a href="/auth" onClick={logout}><div className='btn_cnnx'>Déconnexion</div></a>
                {/* Ajoutez autant de champs supplémentaires que vous le souhaitez */}
              </>
            )}
                </div>
            </li>
        </ul>
      </nav>
    );
  }
  export default Navbar;