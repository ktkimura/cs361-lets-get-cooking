import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function RecipesPage(){

    const [recipes, setRecipes]                             = useState([]);
    const [showDeleteModal, setShowDeleteModal]             = useState(false);
    const [showDeleteDoneModal, setShowDeleteDoneModal]     = useState(false);
    const [selectedRecipe, setSelectedRecipe]               = useState(null);

    /*  Citation for getRecipes() and deleteRecipe() functions: 
    *   Date: 07/28/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (recipe data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function getRecipes() {
        fetch("/recipes")
            .then(response => response.json())
            .then(data => {
                setRecipes(data)
                }
            )
    }

    function deleteRecipe(id) {
        fetch("/deleteRecipe/" + id, {
            method: 'DELETE',
        })
            .then(() => {
                getRecipes();
                setShowDeleteModal(false);
                setShowDeleteDoneModal(true);
        });
    }
    
    function handleDeleteClick(recipe) {
        setSelectedRecipe(recipe);
        setShowDeleteModal(true);
    }

    function handleConfirmDelete() {
        deleteRecipe(selectedRecipe.id);
    }


    useEffect(() => {
        getRecipes();
    }, [])


    return(
        <>
            <h2>Recipes</h2>
            <br></br>
            <Link to="/addRecipe" class="btn">Add Recipe</Link>
            <table>
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Ingredients</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                        <td><Link to={`/viewRecipe/${recipe.id}`}>{recipe.name}</Link></td>
                        <td>{recipe.ingredients.join(', ')}</td>
                        <td>
                            {/* each row in table has its own view, edit, and delete button that will auto-populate with that row's recipe data */}
                            <Link to={`/viewRecipe/${recipe.id}`} class="btn">View</Link>
                            <Link to={`/editRecipe/${recipe.id}`} class="btn">Edit</Link>
                            <button onClick={() => handleDeleteClick(recipe)}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showDeleteModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Are you sure you want to delete this recipe?</h3>
                    <p>This action will permanently remove {selectedRecipe?.name} from your recipes!</p>
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        )}
        {showDeleteDoneModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Recipe Deleted!</h3>
                    <p>The recipe has been removed from your saved recipes.</p>
                    <button onClick={() => setShowDeleteDoneModal(false)} align="center">Close</button>
                </div>
            </div>
        )}

        </>
    );
}

export default RecipesPage;