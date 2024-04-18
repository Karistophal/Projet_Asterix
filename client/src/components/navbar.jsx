import React from 'react';
import '../assets/styles/navbar.css';
import LogoAsterix from '../assets/images/logo_asterix.png';
import Loupe from '../assets/images/loupe_logo-removebg-preview.png';
import LogoProfile from '../assets/images/profile_logo-removebg-preview.png'


function Navbar() {
    return (
      <nav className='nav-container'>
        <ul>
            <li>
                <img src={LogoAsterix} alt="" className='logo-asterix' />
                <a href="/" className='link'>Accueil</a>
                <a href="/attractions" className='link'>Attractions</a>
                <a href="/"className='link'>Aide</a>
                <a href="/"className='link'>Contact</a>
                <div className='search-bar'>
                <img src={LogoProfile} alt="" className='logo-profile'/>
                <img src={Loupe} alt="" className='search-icon'/>
                <a href="/"><div className='btn_cnnx'>Connexion</div></a>
                </div>
            </li>
        </ul>
      </nav>
    );
  }
  export default Navbar;