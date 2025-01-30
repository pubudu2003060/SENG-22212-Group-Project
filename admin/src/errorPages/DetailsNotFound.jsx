import React from 'react';
import { useNavigate } from 'react-router-dom';

function DetailsNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will take the user to the previous page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Details Not Found</h1>
            <p>Sorry, the details you are looking for were not found. Please try again.</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
}

export default DetailsNotFound;
