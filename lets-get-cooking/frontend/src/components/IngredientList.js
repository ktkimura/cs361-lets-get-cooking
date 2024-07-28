import React from 'react';


const IngredientList = ({ ingredients, onDelete, onEdit }) => {
    return(
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
                            <button onClick={() => onEdit(ingredient.id)}>Edit</button> 
                            <button onClick={() => onDelete(ingredient.id)}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default IngredientList;