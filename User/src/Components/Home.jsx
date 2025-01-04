import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";


function HomePage() {
    const navigate = useNavigate();


    const goToLogin = () => {
        navigate("/LoginForm");
    };


    const goToRegister = () => {
        navigate("/PersonalDetailsForm");
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="text-container">
                    <h1 className="main-title">Welcome to the National Fuel Pass</h1>
                    <p className="subtitle">A platform for managing your fuel quota and distribution.</p>

                    <div className="buttons-container">
                        <button onClick={goToRegister} className="btn-home">Register</button>
                        <button onClick={goToLogin} className="btn-home">Login</button>
                    </div>

                    <p className="info-text">If you're a new user, please register first. If you're already registered, click Login.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
