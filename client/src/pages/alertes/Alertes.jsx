import React, { useState, useEffect, useContext } from 'react';
import '../../assets/styles/alertes.css';
import Button from '../../components/bouton';
import { AuthContext } from '../../authContext';

function Alertes() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [importance, setImportance] = useState('');
    const [importanceOptions, setImportanceOptions] = useState([]); // Options for the dropdown
    const { isLoggedIn, isAdmin } = useContext(AuthContext);

    const [data, setData] = useState([]);
    useEffect(() => {
        if (!isLoggedIn()) {
            window.location.href = '/auth';
            return;
        }
        fetch("http://localhost:3333/api/alertes")
            .then(res => res.json())
            .then(result => {
                setData(result);
            });

        fetch("http://localhost:3333/api/importance")
            .then(res => res.json())
            .then(result => {
                setImportanceOptions(result);
            });
    }, []);

    const handleAdd = async () => {
        const importanceValue = importance || '1'; // Default to the first option if no value is selected
        console.log(titre, description, importance);
        try {
            const response = await fetch('http://localhost:3333/api/ajoutalertes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titre, description, importance: importanceValue }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newAlerte = await response.json();
            setData([...data, newAlerte]);
        } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3333/api/alertesDel/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove the deleted item from the state
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
        }
    };

    return (
        <div>
            {isAdmin() && (
                <div>
                    <div className="alerteTitle">Créer une Alerte</div>
                    <input type="text" value={titre} onChange={e => setTitre(e.target.value)} required />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                    <select value={importance} onChange={e => setImportance(e.target.value)} required>
                        {importanceOptions.map((option, index) => (
                            <option value={option.idNiv} key={index}>{option.libelle}</option>
                        ))}
                    </select>
                    <Button onClick={() => handleAdd()} text={'Ajouter'} />
                </div>
            )}
            <div className="alerteTitle">Les Alertes En cours</div>
            <div className="alerteWrapper">
                {data.map((item, index) => (
                    <div className='leAlerte'>
                        <div className={item.id} key={item.id}>
                            <p>{`titre: ${item.titre} - description: ${item.description} - importance: ${item.libelle}`}</p>
                        </div>
                        {isAdmin() && (
                            <div className="zoneValider">
                                <Button onClick={() => handleDelete(item.id)} text={'Supprimer'} taille={"xl"}></Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Alertes
