import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function PantryPage(){

    const [ingredients, setIngredients]                     = useState([]);
    const [expiredIngredients, setExpiredIngredients]       = useState([]);
    const [showDeleteModal, setShowDeleteModal]             = useState(false);
    const [showDeleteDoneModal, setShowDeleteDoneModal]     = useState(false);
    const [showExpiredModal, setShowExpiredModal]           = useState(false);
    const [showNoExpiredModal, setShowNoExpiredModal]       = useState(false);
    const [selectedIngredient, setSelectedIngredient]       = useState(null);

    function getIngredients() {
        fetch("/pantry")
            .then(response => response.json())
            .then(data => {
                setIngredients(data)
                }
            )
    };

    function viewExpiredIngredients() {
        fetch("/viewExpiredIngredients")
            .then(response => response.json())
            .then(data => {
                if (data.error){
                    setShowNoExpiredModal(true);
                } else {
                    setExpiredIngredients(data);
                    setShowExpiredModal(true);
                }
            });
    };

    function deleteIngredient(id) {
        fetch("/deleteIngredient/" + id, {
            method: 'DELETE',
        })
            .then(() => {
                getIngredients();
                setShowDeleteModal(false);
                setShowDeleteDoneModal(true);
            });
    }
    
    function handleDeleteClick(ingredient) {
        setSelectedIngredient(ingredient);
        setShowDeleteModal(true);
    }

    function handleConfirmDelete() {
        deleteIngredient(selectedIngredient.id);
    }


    useEffect(() => {
        getIngredients();
    }, []);


    return(
        <>
            <h2>Pantry</h2>
            <br></br>
            <Link to="/addIngredient" class="btn">Add Ingredient</Link>
            <button onClick={() => {viewExpiredIngredients()}}>View Expired Ingredients</button>
            <table>
            <thead>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Expiration Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity}</td>
                        <td>{ingredient.expirationDate}</td>
                        <td>
                            {/* each row in table has its own edit and delete button that will auto-populate with that row's ingredient data */}
                            <Link to={`/editIngredient/${ingredient.id}`} class="btn">Edit</Link>
                            <button onClick={() => handleDeleteClick(ingredient)}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showDeleteModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Are you sure you want to delete this ingredient?</h3>
                    <p>This action will permanently remove {selectedIngredient?.name} from your pantry!</p>
                    <button onClick={handleConfirmDelete}>Confirm</button>
                    <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        )}
        {showDeleteDoneModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Ingredient Deleted!</h3>
                    <p>The ingredient has been removed from your pantry.</p>
                    <button onClick={() => setShowDeleteDoneModal(false)} align="center">Close</button>
                </div>
            </div>
        )}
        {showExpiredModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>Expired Ingredients</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredient Name</th>
                                <th>Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expiredIngredients.map((ingredient) => (
                                <tr key={ingredient.id}>
                                    <td>{ingredient.name}</td>
                                    <td>{ingredient.expirationDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => setShowExpiredModal(false)}>Close</button>
                </div>
            </div>
        )}
        {showNoExpiredModal && (
            <div class="modal">
                <div class="modal-content">
                    <h3>You have no expired ingredients!</h3>
                    <button onClick={() => setShowNoExpiredModal(false)}>Close</button>
                </div>
            </div>
        )}
        </>
    );
}

export default PantryPage;