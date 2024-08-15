import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
    const [recipeLink, setRecipeLink]       = useState('');
    const [showModal, setShowModal]         = useState(false);

    const redirect = useNavigate('/recipes');

    function handleLinkSubmit(e){
        e.preventDefault();

        fetch("/addRecipeLink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipeLink}),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                redirect('/recipes');
            }, 2500); 
        })
    }

    return (
        <div>
            <h3>Add Recipe (Hyperlink)</h3>
            <p>Please note that the website may currently struggle to handle fractions when grabbing recipe data from your provided hyperlink.</p>
            <div>
                {showModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Recipe Added!</h3>
                            <p>You will be automatically redirected to the Recipes page where the recipe should now display.</p>
                        </div>
                    </div>
                )}
                <form onSubmit={handleLinkSubmit}>
                        <label for="recipeLink">Recipe Link:</label>
                        <input 
                            type="text" 
                            placeholder="Link to recipe"
                            value={recipeLink} 
                            id="recipeLink"
                            onChange={e => setRecipeLink(e.target.value)}
                            required/>
                        <button type="submit">Submit</button>
                        <Link to="/recipes" class="btn">Return to Recipes</Link>
                </form>
            </div>
        </div>
    )
}

export default AddRecipePage;