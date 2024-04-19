import React, { useState, useEffect } from 'react';

function Alertes() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3333/api/alertes")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);

  return (
    <div>
      
      {data.map((item, index) => (
                <div className='leCompte'>
                <div className={item.user_id} key={item.user_id}>
                    <p>{`titre: ${item.titre} - description: ${item.description}`}</p>
                </div>
                </div>
            ))}

    </div>
  )
}

export default Alertes
