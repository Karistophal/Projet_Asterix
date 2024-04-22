import '../../App.css';
import '../../assets/styles/auth.css';
import { useNavigate } from "react-router-dom";
import LogoProfile from '../../assets/images/logo_asterix.png'
import React, { useState } from 'react';

function Authentification() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  function handleClick() {
    navigate("/");
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(formData);
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3333/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token); // Stockez le token dans le stockage local
  
      handleClick();
    } catch (error) {
      console.error('Connection error:', error);
    }
    window.location.reload(); // Recharge la page actuelle
  };

  return (
      <div className="bodyy">
        <div className="buttonWrapper">

          <div className='imageLogoAuth'>

            <img src={LogoProfile} alt="" className='logoAuth'/>

          </div>

          <div className='infosRentrerAuth'>

          <div className="CarreArrondiTahLesInfos">

            <div className="zoneEntree">
                <input type="text" className="inputAuth UsernameEntry" id="inputUsername" name="username" onChange={ handleChange } required />
                <span>Nom d'utilisateur</span>
            </div>

            <div className="zoneEntree">
                <input type="password" className="inputAuth PasswordEntry" id="inputPassword" name="password" onChange={ handleChange } required />
                <span>Mot de passe</span>
            </div>

            <div className="zoneValider">
              <button id="boutonValider" type="submit" className="boutonValider" onClick={ handleSubmit }><span>Valider</span><i></i></button>
            </div>

          </div>

          </div>

        </div>
      </div>
  );
}

export default Authentification;