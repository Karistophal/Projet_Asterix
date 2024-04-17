import React, { useState, useEffect } from "react";
import Card from '../../src/components/card';
import '../assets/styles/attraction.css';
function Attractions(){
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/attractions")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);

    const handleAdd = () => {
        // Code pour ajouter une attraction
    };

    const handleEdit = (id) => {
        // Code pour modifier une attraction
    };

    const handleDelete = (id) => {
        // Code pour supprimer une attraction
    };

    
    
    return (
        <div className="attractions_list">
            {data.map((item, index) => (
                <div key={index}>
                    <Card {...item} />
                </div>
            ))}
        </div>
    );
}
export default Attractions;
