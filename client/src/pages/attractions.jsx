import React, { useState, useEffect } from "react";
import Card from '../../src/components/card';

function Attractions(){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/attractions")
            .then(res => res.json())
            .then(result => { 
                setData(result);
            });
    }, []);
    
    return (
        console.log(data),
        <div className="attractions_list">
            {data.map((item, index) => (
                <Card {...item} key={index}/>
            ))}
        </div>
    );
}
export default Attractions;
