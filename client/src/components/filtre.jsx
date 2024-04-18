// Importation de React et du hook useState
import React from 'react';
import { useState } from 'react';

// Importation du CSS pour ce composant
import '../assets/styles/filter.css';

// Définition du composant Filtre. Il prend deux props : data et setFilterdata.
function Filtre({data, setFilterdata}) {
    // Initialisation de l'état sliderValue à 0 en utilisant le hook useState
    const [sliderValue, setSliderValue] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const [isAlphabetical, setIsAlphabetical] = useState(true);
    // Définition d'une fonction pour gérer les changements de l'input de recherche
    const handleChange = (e) => {
        // Récupération de la valeur de l'input de recherche
        const value = e.target.value;

        // Filtrage des données en fonction de l'input de recherche
        const result = data.filter((item) => {
            return item.nom.toLowerCase().includes(value.toLowerCase());
        });

        // Mise à jour des données filtrées
        setFilterdata(result);
    }

    // Définition d'une fonction pour trier les données par nom
    const handleSort = () => {
        // Tri des données
        const sortedData = [...data].sort((a, b) => isAlphabetical ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom));
    
        // Mise à jour des données filtrées avec les données triées
        setFilterdata(sortedData);
    
        // Inversion de l'ordre de tri pour le prochain clic
        setIsAlphabetical(!isAlphabetical);
    }

    // Définition d'une fonction pour gérer les changements du slider
    const handleSliderChange = (e) => {
        // Récupération de la valeur du slider
        const sliderValue = Number(e.target.value);

        // Mise à jour de l'état sliderValue
        setSliderValue(sliderValue);

        // Filtrage des données en fonction de la valeur du slider
        const result = data.filter((item) => {
            return item.tailleMini >= sliderValue;
        });

        // Mise à jour des données filtrées
        setFilterdata(result);
    }
    const handleSortBySize = () => {
        // Tri des données par taille
        const sortedData = [...data].sort((a, b) => isAscending ? a.tailleMini - b.tailleMini : b.tailleMini - a.tailleMini);
    
        // Mise à jour des données filtrées avec les données triées
        setFilterdata(sortedData);
    
        // Inversion de l'ordre de tri pour le prochain clic
        setIsAscending(!isAscending);
    }

    // Rendu du composant
    return (
        <div className='filter-container'> 
            <input  type="text" name='name' onChange={handleChange}  className="form-control" placeholder='Search...' />
            <button onClick={handleSort}>Trier par nom</button>
            <button onClick={handleSortBySize}>Trier par taille</button>
            Taille Minimum : <input type="range" min="0" max="200" value={sliderValue} onChange={handleSliderChange} />
            <output>{sliderValue}</output>
        </div>
    )
}

// Exportation du composant Filtre
export default Filtre;