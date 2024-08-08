import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewRecipePage(){
    const { id } = useParams();
    const [name, setName]                                   = useState('');
    const [ingredients, setIngredients]                     = useState('');
    const [instructions, setInstructions]                   = useState('');
    const [showDeleteModal, setShowDeleteModal]             = useState(false);
    const [showDeleteDoneModal, setShowDeleteDoneModal]     = useState(false);
    const [inStock, setInStock]                             = useState('');
    const [outOfStock, setOutOfStock]                       = useState('');

    const redirect = useNavigate();

    useEffect(() => {
        fetch(`/viewRecipe/${id}`)    //get specific recipe data to populate fields
            .then(response => response.json())
            .then(data => {
                const {recipe, compareIngredient} = data;

                // grab recipe data for displaying in HTML elements
                setName(recipe.name);
                setIngredients(recipe.ingredients.join(', '));
                setInstructions(recipe.instructions);

                // grab both arrays of ingredients to show user which ingredients they are missing for recipe
                setOutOfStock(compareIngredient[0].join(', ') || []);
                setInStock(compareIngredient[1].join(', ') || []);
            })
    }, [id]); // "[id]" denotes to only load once with the given id


    function deleteRecipe(id) {
        fetch("/deleteRecipe/" + id, {
            method: 'DELETE',
        })
            .then(() => {
                setShowDeleteModal(false);
                setShowDeleteDoneModal(true);
                setTimeout(() => {
                    redirect('/recipes');
                }, 2500);
        });
    }

    function handleDeleteClick() {
        setShowDeleteModal(true);
    };

    function handleConfirmDelete() {
        deleteRecipe(id);
    };
    
    return(
        <>
            <h2>View Recipe</h2>
            <p>Please refresh this page if you just recently added an ingredient.</p>
            <br></br>
            <div>
                <Link to={`/editRecipe/${id}`} class="btn">Edit</Link>
                <button onClick={() => handleDeleteClick()}>Delete</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Recipe Name</th>
                            <th>Ingredients</th>
                            <th>Instructions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={id}>
                        <td>{name}</td>
                        <td>{ingredients}</td>
                        <td>{instructions}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h3>Ingredient Comparison</h3>
                    <p><strong>Ingredients in stock: </strong>{inStock}</p>
                    <p><strong>Missing ingredients: </strong>{outOfStock}</p>
                </div>
            </div>
            <Link to="/recipes" class="btn">Return to Recipes</Link>

        {showDeleteModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Are you sure you want to delete this recipe?</h3>
                    <p>This action will permanently remove {name} from your recipes!</p>
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        )}
        {showDeleteDoneModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Recipe Deleted!</h3>
                    <p>You will be automatically redirected to the Recipes page.</p>
                </div>
            </div>
        )}

        </>
    );
}

export default ViewRecipePage;