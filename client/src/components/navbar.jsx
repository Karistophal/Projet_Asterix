import React from 'react';
import '../assets/styles/navbar.css';
import { useContext, useState } from 'react';
import LogoAsterix from '../assets/images/logo_asterix.png';
import { AuthContext } from '../authContext';
import Burger from '../assets/images/menu-burger.svg';


function Navbar() {
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const [isNavActive, setIsNavActive] = useState(false);

  const handleBurgerClick = () => {
    setIsNavActive(!isNavActive);
    document.querySelector('.nav-container').classList.toggle('active');
  };

  return (
    <nav className='nav-container'>
      <ul>
        <li>
          <div className="navItems">
            <a href="/"><img src={LogoAsterix} alt="" className='logo-asterix' /></a>
            <a href="/" className='link'>Accueil</a>
            <a href="/attractions" className='link'>Attractions</a>
            {isLoggedIn() && (
              <>
                <a href="/missions"><div className='link'>Missions</div></a>
                <a href="/alertes"><div className='link'>Alerte</div></a>
              </>
            )}
            {isAdmin() && (
              <a href="/admin/comptes" className='link'>Gestion comptes</a>
            )}
          </div>
          <div className='search-bar'>
            {!isLoggedIn() ? (
              <a href="/auth"><div className='btn_cnnx'>Connexion</div></a>
            ) : (
              <a onClick={logout}><div className='btn_cnnx'>Déconnexion</div></a>
            )}
          </div>
        </li>
      </ul>
      <div className="burgerButton" onClick={handleBurgerClick} ><img src={Burger} alt="" /></div>
    </nav>
  );
}
export default Navbar;