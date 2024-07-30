import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav>
            <Link to="/" class="navBar">Home</Link>
            <Link to="/recipes" class="navBar">Recipes</Link>
            <Link to="/pantry" class="navBar">Pantry</Link>
            <Link to="/help" class="navBar">Help</Link>
        </nav>
    );
}

export default Navigation;