import React, { useState, useEffect, useContext } from 'react';
import '../../assets/styles/adminComptes.css';
import Button from '../../components/bouton';
import { AuthContext } from '../../authContext';

function ComptesAdmin() {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        if (!isLoggedIn() || !isAdmin()) {
            window.location.href = '/auth';
            return;
        }
        fetch("http://localhost:3333/comptes")
            .then(res => res.json())
            .then(result => {
                setData(result);
            });
        fetch("http://localhost:3333/equipes")
            .then(res => res.json())
            .then(result => {
                setEquipes(result);
            });
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teamId, setTeamId] = useState('');
    const [admin, setAdmin] = useState(false);

    const handleAdd = async (event) => {
        const token = localStorage.getItem('token');
        event.preventDefault();
        if (!isLoggedIn() || !isAdmin()) {
            window.location.href = '/auth';
            return;
        }
        if (!window.confirm('Voulez-vous vraiment ajouter cet utilisateur?')) {
            return;
        }
        try {
            const response = await fetch('http://localhost:3333/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ email, password, teamId, admin }),
            });
            if (!response.ok) {
                window.alert('Erreur lors de l\'ajout de l\'utilisateur : ' + (await response.json()).error);
                throw new Error('Network response was not ok');
            }

            const newUser = await response.json();
            setData([...data, newUser]);
        } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
        }
    };

    const handleDelete = async (id) => {
        if (!isLoggedIn() || !isAdmin()) { // Vérifiez si l'utilisateur est connecté et est un administrateur
            window.location.href = '/auth';
            return;
        }
        if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur?')) { // Demandez à l'utilisateur de confirmer la suppression
            return;
        }
        try {
            const response = await fetch(`http://localhost:3333/api/comptesDel/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove the deleted item from the state
            setData(data.filter(item => item.user_id !== id));
        } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
        }
    };

    return (
        <div className="compteadminWrapper">
            <div className="addAccountWrapper">
                <div className="addAccountTitre">Ajouter un compte</div>
                <form className='infoAddAccountWrapper' onSubmit={handleAdd}>
                    <div className="infoAddAccount"><div className="child">Adresse mail :</div><div className="infoAddAccountItem"><input type="text" value={email} onChange={e => setEmail(e.target.value)} required /></div></div>
                    <div className="infoAddAccount"><div className="child">Mot de passe :</div><div className="infoAddAccountItem"><input type="text" value={password} onChange={e => setPassword(e.target.value)} required /></div></div>
                    <div className="infoAddAccount"><div className="child">Equipe :</div><div className="infoAddAccountItem">
                        <select value={teamId} onChange={e => setTeamId(e.target.value)} required>
                            <option value="" disabled selected hidden>Sélectionnez une équipe</option>
                            {equipes.map((item) => (
                                <option key={item.equipe_id} value={item.equipe_id}>{item.libelle}</option>
                            ))}
                        </select>
                    </div></div>
                    <div className="infoAddAccount"><div className="child">Admin :</div><div className="infoAddAccountItem">        <input type="checkbox" checked={admin} onChange={(e) => { setAdmin(e.target.checked); console.log(e.target.checked); }} /></div></div>
                    <Button taille={"xl"} submit={true} text={"Ajouter"}/>
                </form>
            </div>
            <div className="addAccountTitre">Liste des comptes</div>
            <div className="listeComptes">

                {data.map((item, index) => (
                    <div className='leCompte' key={index}>
                        <div className="zoneInfo">
                            <div className="infoCompte">Email: <div className="infoCompteItem">{item.adresse_mail}</div></div>
                            <div className="infoCompte">Equipe: <div className="infoCompteItem">{item.libelle}</div></div>
                            <div className="infoCompte">Admin: <div className="infoCompteItem">{item.admin ? "oui" : "non"}</div></div>
                        </div>
                        <div className="zoneValider">
                            <Button submit={true} onClick={() => handleDelete(item.user_id)} taille={'xl'} text={"Supprimer"} />
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default ComptesAdmin
