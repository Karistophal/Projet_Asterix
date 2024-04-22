import React, { useContext } from "react";
import Button from "../components/bouton";
import "../assets/styles/home.css";
import { AuthContext } from "../authContext";

function Home() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="homeWrapper">
            <div className="homeContainer">
                <div className="homeTitle">Bienvenue sur la gestion du Parc Astérix.</div>
                <div className="homeButtonWrapper">
                    {!isLoggedIn() && <Button taille="xl" text="Connexion" path="/auth" />}
                    {!isLoggedIn() && <Button taille="xl" text="Les attractions" path="/attractions" />}
                    {isLoggedIn() && <Button taille="xl" text="Les attractions" path="/attractions" />}
                    {isLoggedIn() && <Button taille="xl" text="Mes missions" path="/missions" />}

                </div>
            </div>
        </div>
    );
}

export default Home;
