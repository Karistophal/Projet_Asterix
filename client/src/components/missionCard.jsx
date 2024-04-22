import React, { useState, useContext } from "react";
import "../assets/styles/missionCard.css";
import Button from "./bouton";
import Commentaire from "../assets/images/commentaire-texte.svg";
import { AuthContext } from "../authContext";

function Card(laMission) {
  const mission = laMission.laMission;
  const { isLoggedIn } = useContext(AuthContext);
  const [commentaire, setCommentaire] = useState(mission.commentaire || "");
  const [commentaireOuInput, setCommentaireOuInput] = useState(false);
  
  const validerMission = (missionId) => {
    const token = localStorage.getItem('token');
    const confirmation = window.confirm("Êtes-vous sûr de vouloir valider cette mission ?");

    if (confirmation) {
      fetch("http://localhost:3333/missions/valider", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ missionId: missionId })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
          }
          window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
    }
  };

  const commenter = () => {
    if (commentaireOuInput) {
      if (!isLoggedIn()){
        alert("Vous devez être connecté pour commenter.");
        window.location.href = "/auth";
        return;
      }
      const token = localStorage.getItem('token');
      fetch("http://localhost:3333/missions/commenter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ missionId: mission.id, commentaire: commentaire })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
          }
          setCommentaireOuInput(false);
          window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
    } else {
      setCommentaireOuInput(true);
    }
  };

  return (
    <div className="cardWrapper" style={{ backgroundImage: `url(${mission.image})` }}>
      <div className="cardTitle">{mission.titre}</div>
      <div className="cardInfo">
        {mission.description !== null ? (
          <div className="cardDescriptionWrapper">
            <div className="cardInfoTitle">Description :
              {!mission.valide && (
                <div className="cardValider">
                  <Button text={"Valider mission"} taille={"xs"} submit={true} onClick={() => validerMission(mission.id)} />
                </div>
              )}
            </div>
            <div className="cardDescription cardInfoText">{mission.description}</div>
          </div>
        ) : null}
        <div className="cardBottomWrapper">
          <div className="cardCommentaireWrapper">
            <div className="cardInfoTitle">Commentaire :</div>
            {commentaireOuInput ? (
              <textarea
                className="cardCommentaireText"
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder="Entrez votre commentaire ici..."
              />
            ) : (
              <div className="cardCommentaire cardInfoText">{mission.commentaire}</div>
            )}
          </div>
          <div className="cardAction">
            <div className="cardCommenter" onClick={() => commenter()}><img src={Commentaire} alt="Icône de commentaire" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
