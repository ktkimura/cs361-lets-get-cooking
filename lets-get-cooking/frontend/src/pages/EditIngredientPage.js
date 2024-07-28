import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditIngredientPage = () => {
    const { id } = useParams();
    const [name, setName]                       = useState('');
    const [quantity, setQuantity]               = useState('');
    const [expirationDate, setExpirationDate]   = useState('');

    const redirect = useNavigate('/pantry');

    useEffect(() => {
        fetch(`http://localhost:8000/ingredients/${id}`)    //get specific ingredient data to populate fields
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setQuantity(data.quantity);
                setExpirationDate(data.expirationDate);
            })
    }, [id]);

    /*  Citation for editIngredient() and handleSubmit() functions: 
    *   Date: 07/27/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (ingredient data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function editIngredient(name, quantity, expirationDate) {
        fetch(`http://localhost:8000/ingredients/${id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, quantity, expirationDate }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Ingredient updated: ', data);
            redirect('/pantry');
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        editIngredient(name, quantity, expirationDate);
    }

    return (
        <div>
            <h3>Edit Ingredient</h3>
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
                <button type="submit">Confirm</button>
                <Link to="/pantry" class="btn">Return to Pantry</Link>
            </form>
        </div>
    )
}

export default EditIngredientPage;