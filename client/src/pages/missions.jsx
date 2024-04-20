import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MissionCard from "../components/missionCard"
import "../assets/styles/missions.css";
import moment from "moment";

function Missions() {

    const isLoggedIn = true; // User connecté
    let selectedOption, selectedMission = 0;
    let mf = [];
    const now = moment().format('yyyy-MM-D');
    const [AllMissions, setAllMissions] = useState([]);
    const [FilterMissions, setFilterMissions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3333/missionss")
            .then(res => res.json())
            .then(result => {
                setAllMissions(result);
                setFilterMissions(result.filter(m => m.date.substring(0, m.date.indexOf('T')) == now))
            })
            .catch(error => console.error('Erreur:', error));
    }, []);


   


    if (isLoggedIn === false) {
        return <Navigate to="/connexion" />
    }

    const selectEvent = (event) => {
        selectedOption = event.target.value;
        switch (selectedOption) {
            case "Today":
                selectedMission = 0;
                mf = AllMissions.filter(m => m.date.substring(0, m.date.indexOf('T')) == now);
                break;
            case "After":
                selectedMission = 1;
                mf = AllMissions.filter(m => m.date.substring(0, m.date.indexOf('T')) > now);
                break;
            case "Past":
                selectedMission = -1;
                mf = AllMissions.filter(m => m.date.substring(0, m.date.indexOf('T')) < now);
                break;
            case "Done":
                selectedMission = 2;
                mf = AllMissions.filter(m => m.valide == true);
                break;
            default:
                break;
        }
        setFilterMissions(mf);
    };

    

    return (
        <div className="missionsWrapper">
            <div className="title">Mes missions</div>
            <div className="selectContainer">
                <div>Pour</div>
                <select id="taches" name="taches" defaultValue={selectedMission} onChange={selectEvent}>
                    <option value="Today">Aujourd'hui</option>
                    <option value="After">Demain</option>
                    <option value="Past">Passées</option>
                    <option value="Done">Finies</option>
                </select>
            </div>
            <div className="cardlist">
                {FilterMissions.length !== 0 ? (FilterMissions.map(mission => (
                        <MissionCard key={mission.id} laMission={mission} />
                     ))
                ) : (
                    <div className="">Il n'y a pas de missions.</div>
                )
                }
            </div>
        </div>
    );
}

export default Missions;
