import React from 'react';
import '../../assets/styles/navbar.css';
import LogoAsterix from '../../assets/images/logo_asterix.png';
import Loupe from '../../assets/images/loupe_logo-removebg-preview.png';
import LogoProfile from '../../assets/images/profile_logo-removebg-preview.png'
// Définition du composant sous forme de fonction
function MonComposant() {
    return (
        
      <nav className='nav-container'>
        <ul>
            <li>
                <img src={LogoAsterix} alt="" className='logo-asterix' />
                <a href="/">Accueil</a>
                <a href="/">Attractions</a>
                <a href="/">Aide</a>
                <a href="/">Contact</a>
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
  export default MonComposant;