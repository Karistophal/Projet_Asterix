import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import MissionCard from "../components/missionCard"
import "../assets/styles/missions.css";
import moment from "moment";
import Button from "../components/bouton";

function Missions() {


    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    let selectedOption, selectedMission = 0;
    let mf = [];
    const now = moment().format('yyyy-MM-D');
    const [AllMissions, setAllMissions] = useState([]);
    const [allPostes, setAllPostes] = useState([]);
    const [allStructures, setAllStructures] = useState([]);
    const [FilterMissions, setFilterMissions] = useState([]);

    // variable pour l'ajout de mission
    const [titreMission, setTitreMission] = useState('');
    const [commentaireMission, setCommentaireMission] = useState('');
    const [dateMission, setDateMission] = useState('');
    const [posteMission, setPosteMission] = useState('');
    const [structureMission, setStructureMission] = useState('');



    useEffect(() => {
        const token = localStorage.getItem('token');
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

    const addMission = async () => {
        console.log("qsdjdnqpls");
        if (isLoggedIn() && isAdmin() && titreMission !== '' && commentaireMission !== '' && dateMission !== '' && posteMission !== '' && structureMission !== '') {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch("http://localhost:3333/addMission", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        titre: titreMission,
                        commentaire: commentaireMission,
                        date: dateMission,
                        poste: posteMission,
                        structure: structureMission
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setAllMissions([...AllMissions, result]);
                setFilterMissions([...FilterMissions, result]);
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };



    return (

        <div className="missionsWrapper">
            {isAdmin() && (
                <div className="adminMissionWrapper">
                    <div className="missionsTitle">Créer une mission</div>
                    <div className="adminMissionButtonWrapper">
                        <div className="adminMissionItem">Titre :<input onChange={e => setTitreMission(e.target.value)} type="text" name="" placeholder="Entrez un titre.." id="" /></div>
                        <div className="adminMissionItem">Description :<textarea onChange={e => setCommentaireMission(e.target.value)} name="" placeholder="Entrez une description.. (optionnel)" id="" cols="30" rows="2"></textarea></div>
                        <div className="adminMissionItem">Date :<input onChange={e => setDateMission(moment(e.target.value, 'YYYY-MM-DD')._i)} type="date" name="" id="" /></div>
                        <div className="adminMissionItem">Poste :
                            <select onChange={e => { setPosteMission(e.target.value); console.log(e.target.value); }} name="" id="">
                                {allPostes.map(poste => (
                                    <option key={poste.id} value={poste.poste_id}>{poste.libelle}</option>
                                ))}
                            </select>
                        </div>
                        <div className="adminMissionItem">Structure :
                            <select onChange={e => { setStructureMission(e.target.value); console.log(e.target); }} name="" id="">
                                {allStructures.map(structure => (
                                    <option key={structure.id} value={structure.id}>{structure.nom}</option>
                                ))}
                            </select>
                        </div>
                    <Button submit={true} onClick={addMission} text="Ajouter" />
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
        </div >
    );
}

export default Missions;
