import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
    const [name, setName]                   = useState('');
    const [ingredients, setIngredients]     = useState('');
    const [instructions, setInstructions]   = useState('');
    const [showModal, setShowModal]         = useState(false);

    const redirect = useNavigate('/recipes');

    function addRecipeManual(name, ingredients, instructions) {
        // convert user input into JSON array by separating elements by comma (,) and trimming any additional whitespace
        let ingredientsArr = ingredients.split(',').map(ingredient => ingredient.trim());

        fetch("/addRecipeManual", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, ingredients: ingredientsArr, instructions}),
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

    return (
        <div>
            <h3>Add Recipe (Manual)</h3>
            <div>
                {showModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Recipe Added!</h3>
                            <p>You will be automatically redirected to the Recipes page where the recipe should now display.</p>
                        </div>
                    </div>
                )}
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
                            class="textArea"
                            onChange={e => setIngredients(e.target.value)}/>
                        <label for="instructions">Instructions:</label>
                        <input 
                            type="textarea" 
                            placeholder="Enter instructions"
                            value={instructions} 
                            id="instructions"
                            class="textArea"
                            onChange={e => setInstructions(e.target.value)}/>
                        <button type="submit">Submit</button>
                        <Link to="/recipes" class="btn">Return to Recipes</Link>
                </form>
            </div>
        </div>
    )
}

export default AddRecipePage;