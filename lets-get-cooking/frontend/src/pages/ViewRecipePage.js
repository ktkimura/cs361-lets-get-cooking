import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewRecipePage(){
    const { id } = useParams();
    const [name, setName]                                   = useState('');
    const [ingredients, setIngredients]                     = useState('');
    const [instructions, setInstructions]                   = useState('');
    const [showDeleteModal, setShowDeleteModal]             = useState(false);
    const [showDeleteDoneModal, setShowDeleteDoneModal]     = useState(false);


    const redirect = useNavigate();

    useEffect(() => {
        fetch(`/viewRecipe/${id}`)    //get specific recipe data to populate fields
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setIngredients(data.ingredients.join(', '));
                setInstructions(data.instructions);
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
            <br></br>
            <Link to={`/editRecipe/${id}`} class="btn">Edit</Link>
            <button onClick={() => handleDeleteClick()}>Delete</button>
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