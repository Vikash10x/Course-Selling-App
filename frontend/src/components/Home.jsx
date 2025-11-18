import React from 'react';
import { useNavigate } from 'react-router-dom';
import Course from './Course';
import { useState } from 'react';

function Home() {
    const [open, setOpen] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            {/* <h1>Welcome Home</h1> */}
            {/* <button onClick={handleLogout}>Logout</button> */}
            {/* <Course /> */}
        </div>
    );
}

export default Home;
