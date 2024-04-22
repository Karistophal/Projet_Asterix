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

    const handleAdd = async (event) => {
        event.preventDefault();
        if (!isLoggedIn() || !isAdmin()) {
            window.location.href = '/auth';
            return;
        }
        try {
            const response = await fetch('http://localhost:3333/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, teamId }),
            });
            if (!response.ok) {
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
                            {equipes.map((item, index) => (
                                <option key={index} value={item.equipe_id}>{item.libelle}</option>
                            ))}
                        </select>
                    </div></div>
                    <Button taille={"xl"} submit={true} text={"Ajouter"}/>
                </form>
            </div>
            <div className="addAccountTitre">Liste des comptes</div>
            <div className="listeComptes">

                {data.map((item, index) => (
                    <div className='leCompte' key={index}>
                        <div className="zoneInfo">
                            <div className="infoCompte">Email: <div className="infoCompteItem">{item.adresse_mail}</div></div>
                            <div className="infoCompte">Mot de passe: <div className="infoCompteItem">{item.mot_de_passe}</div></div>
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
