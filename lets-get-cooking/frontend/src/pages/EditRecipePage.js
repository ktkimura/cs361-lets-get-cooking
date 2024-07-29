import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditRecipePage = () => {
    const { id } = useParams();
    const [name, setName]                   = useState('');
    const [ingredients, setIngredients]     = useState('');
    const [instructions, setInstructions]   = useState('');
    const [showModal, setShowModal]         = useState(false);


    const redirect = useNavigate('/recipes');

    useEffect(() => {
        fetch(`http://localhost:8000/recipes/${id}`)    //get specific recipe data to populate fields
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setIngredients(data.ingredients);
                setInstructions(data.instructions);
            })
    }, [id]);

    /*  Citation for editRecipe() and handleSubmit() functions: 
    *   Date: 07/28/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (recipe data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function editRecipe(name, ingredients, instructions) {
        
        let ingredientsArr = [];
        
        if (typeof ingredients === 'string') {
            ingredientsArr = ingredients.split(',').map(ingredient => ingredient.trim());
        } 
        else if (Array.isArray(ingredients)) {
            ingredientsArr = ingredients;
        }


        fetch(`http://localhost:8000/recipes/${id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, ingredients: ingredientsArr, instructions}),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                redirect('/recipes');
            }, 2500); 
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        editRecipe(name, ingredients, instructions);
    }

    return (
        <div>
            <h3>Edit Recipe</h3>
            <div>
                {showModal && (
                        <div class="modal">
                            <div class="modal-content">
                                <h3>Recipe Updated!</h3>
                                <p>You will be automatically redirected to the Recipes page where the updated recipe should now display.</p>
                            </div>
                        </div>
                    )}
                <form onSubmit={handleSubmit}>
                    <label for="name">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        id="name"
                        onChange={e => setName(e.target.value)}
                        required/>
                    <label for="ingredients">Ingredients:</label>
                    <input 
                        type="textarea" 
                        value={ingredients} 
                        id="ingredients"
                        onChange={e => setIngredients(e.target.value)}/>
                    <label for="instructions">Instructions:</label>
                    <input 
                        type="textarea" 
                        value={instructions} 
                        id="instructions"
                        onChange={e => setInstructions(e.target.value)}/>
                    <button type="submit">Save Changes</button>
                    <Link to="/pantry" class="btn">Return to Recipes</Link>
                </form>
            </div>
        </div>
    )
}

export default EditRecipePage;