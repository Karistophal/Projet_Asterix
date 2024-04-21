import React, { useState, useEffect } from 'react';
import '../../assets/styles/alertes.css';

function Alertes() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3333/api/alertes")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);

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
      
      {data.map((item, index) => (
                <div className='leAlerte'>
                <div className={item.id} key={item.id}>
                    <p>{`titre: ${item.titre} - description: ${item.description}`}</p>
                </div>
                <div className="zoneValider">
                <button id="boutonValider" type="submit" className="boutonValider" onClick={() => handleDelete(item.id)}><span>Delete</span><i></i></button>
                </div>
                </div>
            ))}

    </div>
  )
}

export default Alertes
