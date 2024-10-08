import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditIngredientPage = () => {
    const { id } = useParams();
    const [name, setName]                       = useState('');
    const [quantity, setQuantity]               = useState('');
    const [expirationDate, setExpirationDate]   = useState('');
    const [showModal, setShowModal]             = useState(false);


    const redirect = useNavigate('/pantry');

    useEffect(() => {
        fetch(`/editIngredient/${id}`)    //get specific ingredient data to populate fields
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setQuantity(data.quantity);
                setExpirationDate(data.expirationDate);
            })
    }, [id]);

    function editIngredient(name, quantity, expirationDate) {
        fetch(`/editIngredient/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, quantity, expirationDate }),
        })
        .then(response => response.json())
        .then(() => {
            setShowModal(true);
            setTimeout(() => {
                redirect('/pantry');
            }, 2500); 
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        editIngredient(name, quantity, expirationDate);
    }

    return (
        <div>
            <h3>Edit Ingredient</h3>
            <div>
                {showModal && (
                        <div class="modal">
                            <div class="modal-content">
                                <h3>Ingredient Updated!</h3>
                                <p>You will be automatically redirected to the Pantry page where the updated ingredient should now display.</p>
                            </div>
                        </div>
                    )}
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <th>Ingredient Name</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        id="name"
                                        onChange={e => setName(e.target.value)}
                                        required/>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={quantity} 
                                        id="quantity"
                                        onChange={e => setQuantity(e.target.value)}/>
                                </td>
                                <td>
                                    <input 
                                    type="date" 
                                    min="2024-07-29"
                                    value={expirationDate} 
                                    id="expDate"
                                    onChange={e => setExpirationDate(e.target.value)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">Save Changes</button>
                    <Link to="/pantry" class="btn">Return to Pantry</Link>
                </form>
            </div>
        </div>
    )
}

export default EditIngredientPage;