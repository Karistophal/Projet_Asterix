import React, { useState, useEffect } from 'react';
import '../../assets/styles/adminComptes.css';

function ComptesAdmin() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3333/api/comptes")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);

    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [teamId, setTeamId] = useState('');

const handleAdd = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3333/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, teamId }),
        }); 

        console.log(response);

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
    <div className="bodyy">

<form onSubmit={handleAdd}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <input type="number" value={teamId} onChange={e => setTeamId(e.target.value)} required />
            <button className='addAccountButton' type="submit">Ajouter</button>
        </form>

        <div className="listeComptes">



            {data.map((item, index) => (
                <div className='leCompte'>
                <div className={item.user_id} key={item.user_id}>
                    <p>{`mail: ${item.adresse_mail} - mot de passe: ${item.mot_de_passe}`}</p>
                </div>
                <div className="zoneValider">
                <button id="boutonValider" type="submit" className="boutonValider" onClick={() => handleDelete(item.user_id)}><span>Delete</span><i></i></button>
                </div>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default ComptesAdmin
