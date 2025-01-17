import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import WebFooter from "../Components/WebFooter";

function HomePage() {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(true); 

    const goToLogin = () => {
        navigate("/LoginForm");
    };

    const goToRegister = () => {
        /*if (isRegistered) {
            alert("You are already registered. Please log in instead.");
        } else {
            navigate("/PersonalDetailsForm");
        }*/
        navigate("/PersonalDetailsForm");
    };

    return (
        <div>
        <div className="home-page">
            <div className="top-bar">
               <div><img src="/images/lastfuel.png" alt="" /></div>
               <div><h2>YOUR DIGITAL FUEL PASS MADE SIMPLE</h2></div>
            </div>

            <div className="text-container">
                <div><h1 className="main-title">Welcome to the National Fuel Pass</h1></div>
                <div><p className="subtitle">A platform for managing your fuel quota and distribution.</p></div>

                <div className="buttons-container">
                    <button onClick={goToRegister} className="btn-home">Register</button>
                    <button onClick={goToLogin} className="btn-home">Login</button>
                </div>

                <div><p className="info-text">If you're a new user, please register first. If you're already registered, click Login.</p></div>
            </div>
           
        </div>
        <WebFooter />
        </div>
        
    );
}

export default HomePage;
