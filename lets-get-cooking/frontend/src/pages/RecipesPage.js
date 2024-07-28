import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function RecipesPage(){
    
    const [recipes, setRecipes]                 = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading]                 = useState(false)
    const [showModal, setShowModal]             = useState(false);
    const [selectedRecipe, setSelectedRecipe]   = useState(null);

    /*  Citation for getRecipes() and deleteRecipes() functions: 
    *   Date: 07/28/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (recipe data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function getRecipes() {
        setLoading(true);
        fetch("http://localhost:8000/recipes")
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                setRecipes(result);
            })
    }

    function deleteRecipe(id) {
        fetch(`http://localhost:8000/recipes/${id}`, {
            method: 'DELETE',
        }).then(() => {
            getRecipes();
            setShowModal(false);
        });
    }
    
    function handleDeleteClick(recipe) {
        setSelectedRecipe(recipe);
        setShowModal(true);
    }

    function handleConfirmDelete() {
        deleteRecipe(selectedRecipe.id);
    }


    useEffect(() => {
        getRecipes();
    })


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
                        <td>{recipe.name}</td>
                        <td>{recipe.ingredients.join(', ')}</td>
                        <td>
                            {/* each row in table has its own edit and delete button that will auto-populate with that row's recipe data */}
                            <Link to={`/editRecipe/${recipe.id}`} class="btn">Edit</Link>
                            <button onClick={() => handleDeleteClick(recipe)}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h3>Are you sure you want to delete this recipe?</h3>
                    <p>This action will permanently remove {selectedRecipe?.name} from your pantry!</p>
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        )}

        </>
    );
}

export default RecipesPage;