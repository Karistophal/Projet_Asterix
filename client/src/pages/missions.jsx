import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import MissionCard from "../components/missionCard"
import "../assets/styles/missions.css";
import moment from "moment";

function Missions() {


    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    let selectedOption, selectedMission = 0;
    let mf = [];
    const now = moment().format('yyyy-MM-D');
    const [AllMissions, setAllMissions] = useState([]);
    const [allPostes, setAllPostes] = useState([]);
    const [allStructures, setAllStructures] = useState([]);
    const [FilterMissions, setFilterMissions] = useState([]);

    useEffect(() => {
        if (!isLoggedIn()) {
            window.location.href = "/auth";
            return;
        }
        fetch("http://localhost:3333/missions", {
            method: 'GET', // Spécification de la méthode GET
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Utilisation du token dans l'en-tête Authorization
            }
        })
            .then(res => res.json())
            .then(result => {
                setAllMissions(result);
                // Filtrer les missions au chargement pour aujourd'hui
                setFilterMissions(result.filter(m => m.date.substring(0, m.date.indexOf('T')) == now))
            })
            .catch(error => console.error('Erreur:', error));
        if (isAdmin()) {
            fetch("http://localhost:3333/postes", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(result => setAllPostes(result))
                .catch(error => console.error('Erreur:', error));
            fetch("http://localhost:3333/structures", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(result => setAllStructures(result))
                .catch(error => console.error('Erreur:', error));

        }
    }, []);

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
            {isAdmin() && (
                <div className="adminMissionWrapper">
                    <div className="missionsTitle">Créer une mission</div>
                    <div className="adminMissionButtonWrapper">
                        <form action="POST">
                            <input type="text" name="" placeholder="Entrez un titre.." id="" />
                            <textarea name="" id="" cols="30" rows="2"></textarea>
                            <input type="date" name="" id="" />
                            <select name="" id="">
                                {allPostes.map(poste => (
                                    <option key={poste.id} value={poste.id}>{poste.libelle}</option>
                                ))}
                            </select>
                            <select name="" id="">
                                {allStructures.map(structure => (
                                    <option key={structure.id} value={structure.id}>{structure.nom}</option>
                                ))}
                            </select>
                        </form>
                    </div>
                </div>
            )
            }
            <div className="mesMissionsWrapper">
                <div className="missionsTitle">Mes missions</div>
                <div className="missionSelectContainer">
                    <div>Pour</div>
                    <select id="taches" name="taches" defaultValue={selectedMission} onChange={selectEvent}>
                        <option value="Today">Aujourd'hui</option>
                        <option value="After">Demain</option>
                        <option value="Past">Passées</option>
                        <option value="Done">Finies</option>
                    </select>
                </div>
                <div className="missionCardlist">
                    {FilterMissions.length !== 0 ? (FilterMissions.map(mission => (
                        <MissionCard key={mission.id} laMission={mission} />
                    ))
                    ) : (
                        <div className="noMission">Il n'y a pas de missions disponibles .</div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Missions;
