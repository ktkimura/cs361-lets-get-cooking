import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
    const [recipeLink, setRecipeLink]               = useState('');
    const [showConfirmModal, setShowConfirmModal]   = useState(false);
    const [showErrorModal, setShowErrorModal]           = useState(false);
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
        .then(data => {
            if (data.error) {
                setShowErrorModal(true);
            } else {
                setShowConfirmModal(true);
                setTimeout(() => {
                redirect('/recipes');
            }, 2500); 
            }
        })
    }

    return (
        <div>
            <h3>Add Recipe (Hyperlink)</h3>
            <p>Please provide a valid hyperlink to a recipe that you want to add to your collection. Refer to the <Link to="/help">Help page</Link> for a list of valid website domains.</p>
            <div>
                {showConfirmModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Recipe Added!</h3>
                            <p>You will be automatically redirected to the Recipes page where the recipe should now display.</p>
                        </div>
                    </div>
                )}
                {showErrorModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Recipe data could not be retrieved</h3>
                            <p>Please make sure you provided a valid hyperlink!</p>
                            <Link to="/addRecipeLink" class="btn" onClick={() => setShowErrorModal(false)}>Close</Link>
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