import React from "react";
import Button from "../components/bouton";
import "../assets/styles/home.css";

function Home() {

    const isLoggedIn = true; // User connecté

    return (
        <div className="homeWrapper">
            <div className="homeContainer">
                <div className="title">Bienvenue sur la gestion du Parc Astérix.</div>
                <div className="buttonWrapper">
                    <Button taille="xl" text="Connexion" path="/connexion" />
                    {!isLoggedIn && <Button taille="xl" text="Attractions" path="/attractions" />}
                    {isLoggedIn && <Button taille="xl" text="Mes missions" path="/missions" />}
                </div>
            </div>
        </div>
    );
}

export default Home;
