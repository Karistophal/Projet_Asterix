import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MissionCard from "../components/missionCard"
import "../assets/styles/missions.css";

function Missions() {

    const isLoggedIn = true; // User connecté

    //recupération des missions
    const [mesMissions, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3333/missionstest")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);
    
    if (isLoggedIn === false) {
        return <Navigate to="/connexion" />
    }
    

    return (
        <div className="missionsWrapper">
            <div className="title">Mes missions du jour</div>
            <div className="cardlist">
                {mesMissions.map(mission => (
                   <MissionCard key={mission.id} laMission={mission} />
                ))}
            </div>
        </div>
    );
}

export default Missions;
