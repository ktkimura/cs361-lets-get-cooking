import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddIngredientPage = () => {
    const [name, setName]                       = useState('');
    const [quantity, setQuantity]               = useState('');
    const [expirationDate, setExpirationDate]   = useState('');
    const [showModal, setShowModal]             = useState(false);

    const redirect = useNavigate('/pantry');

    /*  Citation for addIngredient() and handleSubmit() functions: 
    *   Date: 07/27/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (ingredient data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function addIngredient(name, quantity, expirationDate) {
        const id = uuidv4();

        fetch("http://localhost:8000/ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, name, quantity, expirationDate}),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                redirect('/pantry');
            }, 2500); 
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        addIngredient(name, quantity, expirationDate);
    }

    return (
        <div>
            <h3>Add Ingredient</h3>
            <div>
                {showModal && (
                    <div class="modal">
                        <div class="modal-content">
                            <h3>Ingredient Added!</h3>
                            <p>You will be automatically redirected to the Pantry page where the ingredient should now display.</p>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label for="name">Name:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Ingredient Name"
                        value={name} 
                        id="name"
                        onChange={e => setName(e.target.value)}
                        required/>
                    <label for="quantity">Quantity:</label>
                    <input 
                        type="number" 
                        placeholder="1"
                        value={quantity} 
                        id="quantity"
                        onChange={e => setQuantity(e.target.value)}/>
                    <label for="expDate">Expiration Date:</label>
                    <input 
                        type="text" 
                        placeholder="YYYY-MM-DD"
                        value={expirationDate} 
                        id="expDate"
                        onChange={e => setExpirationDate(e.target.value)}/>
                    <button type="submit">Submit</button>
                    <Link to="/pantry" class="btn">Return to Pantry</Link>
                </form>
            </div>
        </div>
    )
}

export default AddIngredientPage;