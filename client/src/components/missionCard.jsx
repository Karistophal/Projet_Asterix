import React from "react";
import "../assets/styles/missionCard.css"

function Card(laMission) {

  console.log(laMission);
  const mission = laMission.laMission



  return (
    <div className="cardWrapper" style={{backgroundImage: `url(${mission.image})`}}>
      {mission.description}
    </div>
  );
}

export default Card;
