import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';

function FuelManagement() {
    const [headerTitle, setHeaderTitle] = useState('Fuel Management'); // Default title
    const userName = 'John Doe'; // Replace with user data from login

    return (
        <>
            <Headerbar headerTitle={headerTitle} userName={userName} />
        
        </>
    );
    }

export default FuelManagement;
