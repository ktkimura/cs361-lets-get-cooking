import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/pantry">Pantry</Link>
            <Link to="/help">Help</Link>
        </nav>
    );
}

export default Navigation;