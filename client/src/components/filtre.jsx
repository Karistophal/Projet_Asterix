import React from 'react';
import { useState } from 'react';
import '../assets/styles/filter.css';

function Filtre({data, setFilterdata}) {
    const [sliderValue, setSliderValue] = useState(0);
    const handleChange = (e) => {
        const value = e.target.value;
        const result = data.filter((item) => {
            return item.nom.toLowerCase().includes(value.toLowerCase());
        });
        setFilterdata(result);
    }

    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => a.nom.localeCompare(b.nom));
        setFilterdata(sortedData);
    }

    const handleSliderChange = (e) => {
        const sliderValue = Number(e.target.value);
        setSliderValue(sliderValue);
        const result = data.filter((item) => {
            return item.tailleMini >= sliderValue;
        });
        setFilterdata(result);
    }

    return (
        <div> 
            <input  type="text" name='name' onChange={handleChange}  className="form-control" placeholder='Search...' />
            <button onClick={handleSort}>Trier par nom</button>
            <input type="range" min="0" max="200" value={sliderValue} onChange={handleSliderChange} />
        </div>
    )
}

export default Filtre;