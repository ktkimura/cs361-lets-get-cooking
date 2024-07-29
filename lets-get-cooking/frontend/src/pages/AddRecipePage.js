import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddRecipePage = () => {
    const [name, setName]                   = useState('');
    const [ingredients, setIngredients]     = useState('');
    const [instructions, setInstructions]   = useState('');
    const [recipeLink, setRecipeLink]       = useState('');
    const [showModal, setShowModal]         = useState(false);

    const redirect = useNavigate('/recipes');

    /*  Citation for addRecipe() and handleSubmit() functions: 
    *   Date: 07/28/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (recipe data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function addRecipeManual(name, ingredients, instructions) {
        const id = uuidv4();
        
        // convert user input into JSON array by separating elements by comma (,) and trimming any additional whitespace
        let ingredientsArr = ingredients.split(',').map(ingredient => ingredient.trim());

        fetch("http://localhost:8000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, name, ingredients: ingredientsArr, instructions}),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                redirect('/recipes');
            }, 2500); 
        })
    }

    function handleManualSubmit(e){
        e.preventDefault();
        addRecipeManual(name, ingredients, instructions);
    }

    function addRecipeLink(link) {
        console.log(link);
        // add recipe scraper stuff here
    }

    function handleLinkSubmit(e) {
        e.preventDefault();
        addRecipeLink(recipeLink);
    }

    return (
        <div>
            <h3>Add Recipe</h3>
            <p>Please use the tabs below to select your desired input type.</p>
            <div>
                {showModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Recipe Added!</h3>
                            <p>You will be automatically redirected to the Recipes page where the recipe should now display.</p>
                        </div>
                    </div>
                )}
                <div class="tab">
                    <button class="tabLink" onClick="">Manual</button>
                    <button class="tabLink" onClick="">Hyperlink</button>
                </div>
                {/* form for manual recipe input */}
                <div class="tabContent" id="manualRecipeInput">
                    <form onSubmit={handleManualSubmit}>
                        <label for="name">Name:</label>
                        <input 
                            type="text" 
                            placeholder="Name of recipe"
                            value={name} 
                            id="name"
                            onChange={e => setName(e.target.value)}
                            required/>
                        <label for="ingredients">Ingredients:</label>
                        <input 
                            type="textarea" 
                            placeholder="Enter ingredients separated by commas"
                            value={ingredients} 
                            id="ingredients"
                            onChange={e => setIngredients(e.target.value)}/>
                        <label for="instructions">Instructions:</label>
                        <input 
                            type="textarea" 
                            placeholder="Enter instructions"
                            value={instructions} 
                            id="instructions"
                            onChange={e => setInstructions(e.target.value)}/>
                        <button type="submit">Submit</button>
                        <Link to="/recipes" class="btn">Return to Recipes</Link>
                    </form>
                </div>
                {/* form for hyperlink recipe input */}
                <div class="tabContent" id="linkRecipeInput">
                    <form onSubmit={handleLinkSubmit}>
                        <label for="recipeLink">Name:</label>
                        <input 
                            type="text" 
                            placeholder="Hyperlink to recipe posting"
                            value={recipeLink} 
                            id="recipeLink"
                            onChange={e => setRecipeLink(e.target.value)}
                            required/>
                        <button type="submit">Submit</button>
                        <Link to="/recipes" class="btn">Return to Recipes</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddRecipePage;