import React from 'react';
import '../../assets/styles/navbar.css';
import LogoAsterix from '../../assets/images/logo_asterix.png';
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
            </li>
        </ul>
      </nav>
    );
  }
  export default MonComposant;