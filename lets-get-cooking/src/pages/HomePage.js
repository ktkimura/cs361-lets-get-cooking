import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(){
    return(
        <>
            <h2>Home</h2>
            <p><strong>
                Welcome to your digital recipe book and pantry!
            </strong></p>
            <br></br>
            <p>
                Store your favorite recipes and keep track of ingredients you currently have 
                in stock to save you time fussing over prep work and <strong>get to actually 
                cooking.</strong>
            </p>
            <br></br>
            <p>
                Access your recipe book and pantry using the navigation bar above or the buttons below:
            </p>
            <Link to="/recipes" class="btn">Recipes</Link>
            <Link to="/pantry" class="btn">Pantry</Link>
        </>
    );
}

export default HomePage;