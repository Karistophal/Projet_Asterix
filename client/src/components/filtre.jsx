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
    const [searchValue, setSearchValue] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

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
    const handleSortByLocation = () => {
        const sortedData = [...data].sort((a, b) => {
            if (isAscending) {
                return a.lieu.localeCompare(b.lieu);
            } else {
                return b.lieu.localeCompare(a.lieu);
            }
        });
        setFilterdata(sortedData);
        setIsAscending(!isAscending);
    }

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        const result = data.filter((item) => {
            return item.nom.toLowerCase().includes(searchValue.toLowerCase()) && item.tailleMini >= sliderValue && (item.lieu === e.target.value || e.target.value === '');
        });
        setFilterdata(result);
    }

    const uniqueLocations = [...new Set(data.map(item => item.lieu))];
    // Rendu du composant
    return (
        <div className='filter-container'> 
            <input  type="text" name='name' onChange={handleChange}  className="form-control" placeholder='Search...' />
            <button onClick={handleSort}>Trier par nom</button>
            <button onClick={handleSortBySize}>Trier par taille</button>
            <button onClick={handleSortByLocation}>Trier par lieu</button>
            <div className='taille'>Taille Minimum : </div><input type="range" min="0" max="200" value={sliderValue} onChange={handleSliderChange} />
            <output>{sliderValue}</output>
            <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Tous les lieux</option>
                {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
        </div>
    )
}

// Exportation du composant Filtre



export default Filtre;