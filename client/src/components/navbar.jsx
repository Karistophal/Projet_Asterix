import React from 'react';
import '../assets/styles/navbar.css';
import { useContext } from 'react';
import LogoAsterix from '../assets/images/logo_asterix.png';
import { AuthContext } from '../authContext';


function Navbar() {
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);

  return (
    <nav className='nav-container'>
      <ul>
        <li>
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
          <div className='search-bar'>
            {!isLoggedIn() ? (
              <a href="/auth"><div className='btn_cnnx'>Connexion</div></a>
            ) : (
              <a onClick={logout}><div className='btn_cnnx'>Déconnexion</div></a>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;