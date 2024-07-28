import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddIngredientPage = () => {
    const [name, setName]                       = useState('');
    const [quantity, setQuantity]               = useState('');
    const [expirationDate, setExpirationDate]   = useState('');

    const redirect = useNavigate('/pantry');

    /*  Citation for addIngredient() and handleSubmit() functions: 
    *   Date: 07/27/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (ingredient data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function addIngredient(name, quantity, expirationDate) {
        const ingredientID = uuidv4();

        fetch("http://localhost:8000/ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ingredientID, name, quantity, expirationDate}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Ingredient added: ', data);
            redirect('/pantry')
        })  
    }

    function handleSubmit(e){
        e.preventDefault();
        addIngredient(name, quantity, expirationDate);
    }

    return (
        <div>
            <h3>Add Ingredient</h3>
            <form onSubmit={handleSubmit}>
                <label for="name">Name:</label>
                <input 
                    type="text" 
                    placeholder="Name of ingredient"
                    value={name} 
                    id="name"
                    onChange={e => setName(e.target.value)}
                    required/>
                <label for="quantity">Quantity:</label>
                <input 
                    type="number" 
                    placeholder="nice"
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
    )
}

export default AddIngredientPage;