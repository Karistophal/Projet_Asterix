import React, { useState, useEffect } from "react";
import Card from '../../src/components/card';
import Filtre from '../../src/components/filtre';
import '../assets/styles/attraction.css';

function Attractions(){
    const [data, setData] = useState([]);
    const [filterdata, setFilterdata]= useState([]);

    useEffect(() => {
        fetch("http://localhost:3333/attraction")
            .then(res => res.json())
            .then(result => { 
                if (Array.isArray(result)) {
                    setData(result);
                    setFilterdata(result);
                } else {
                    console.error('Data fetched is not an array:', result);
                }
            });
    }, []);
    
    return (
        
        <div>
            <Filtre data={data} setFilterdata={setFilterdata}/>
            <div className="attractions_list">
                {filterdata.map((item, index) => (
                    <div key={index}>
                        <Card {...item} />
                    </div>
                ))}
            </div>
        </div>

    );
}
export default Attractions;