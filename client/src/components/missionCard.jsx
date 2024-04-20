import React from "react";
import "../assets/styles/missionCard.css"

function Card(laMission) {

  const mission = laMission.laMission



  return (
    <div className="cardWrapper" style={{backgroundImage: `url(${mission.image})`}}>
      {mission.description}
      <div className="">{}</div>
    </div>
  );
}

export default Card;
