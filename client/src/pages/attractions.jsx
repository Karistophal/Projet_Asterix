import React, { useState, useEffect } from "react";
import Card from '../../src/components/card';
import '../assets/styles/attraction.css';
function Attractions() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3333/attraction")
            .then(res => res.json())
            .then(result => {
                setData(result);
            });
    }, []);


    return (
        <div className="attractionWrapper">
            <div className="attractionTitle">Toutes les attraction :</div>
            <div className="attractions_list">
                {data.map((item, index) => (
                    <div key={index}>
                        <Card {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Attractions;
