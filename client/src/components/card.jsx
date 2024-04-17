// Import de useState depuis React pour gérer l'état de la fenêtre modale
import React, { useState } from 'react';

// Import du fichier de style Sass pour styliser la carte
import '../assets/styles/card.scss';
import '../assets/styles/Modal.css';

// Définition du composant Card prenant des propriétés en entrée
function Card(props) {
  // Déclaration d'un état pour contrôler l'affichage de la fenêtre modale
  const [showInfo, setShowInfo] = useState(false);

  // Fonction pour basculer l'état de l'affichage de la fenêtre modale
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Rendu du composant Card
  return (
    <div className="card-hover">
      <div className="card-hover__content">
        {/* Titre de la carte */}
        <h3 className="card-hover__title">
          {props.nom} {/* Affichage du nom de la carte */}
        </h3>
        {/* Description de la carte */}
        <p className="card-hover__text">{props.description}</p>
        {/* Lien pour afficher plus de détails, avec un bouton et une icône */}
        <a href="#" onClick={toggleInfo} className="card-hover__link">
          <span>Plus de détails</span> {/* Texte du lien */}
          {/* Icône SVG */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>        
        </a>
      </div>
      {/* Affichage conditionnel de la fenêtre modale en fonction de showInfo */}
      {showInfo && (
        <div style={{
          zIndex: 1000,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Contenu de la fenêtre modale */}
          <div style={{
            backgroundColor: '#fff',
            padding: '1em',
            width: '80%',
            maxWidth: '400px',
          }}>
            {/* Nom de la carte */}
            <strong>{props.nom}</strong><br></br>
            {/* Image de la carte */}
            <img src={props.image} alt={props.nom} /><br></br>
            {/* Description de la carte */}
            {props.description}<br></br>
            {/* Bouton pour fermer la fenêtre modale */}
            <button className="button-3" onClick={toggleInfo}>Close</button>
          </div>
        </div>
      )}
      {/* Image de la carte */}
      <img src={props.image} alt={props.nom} />
    </div>
  );
}

// Export du composant Card pour pouvoir l'utiliser ailleurs dans l'application
export default Card;