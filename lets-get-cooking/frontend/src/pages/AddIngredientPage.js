import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddIngredientPage = () => {
    const [name, setName]                       = useState('');
    const [quantity, setQuantity]               = useState('');
    const [expirationDate, setExpirationDate]   = useState('');
    const [showModal, setShowModal]             = useState(false);

    const navigate = useNavigate('/pantry');

    function addIngredient(name, quantity, expirationDate) {
        fetch("/addIngredient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, quantity, expirationDate }),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                navigate('/pantry');
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
                        type="text" 
                        placeholder="1 cup"
                        value={quantity} 
                        id="quantity"
                        onChange={e => setQuantity(e.target.value)}/>
                    <label for="expDate">Expiration Date:</label>
                    <input 
                        type="date" 
                        min="2024-07-29"
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