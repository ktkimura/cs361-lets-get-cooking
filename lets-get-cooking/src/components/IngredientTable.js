import React from 'react';

const ingredients = [
    {name: "Apples", quantity: "4", expirationDate: "2024-07-16"},
    {name: "Ground Cinnamon", quantity: "1", expirationDate: "2026-10-31"},
    {name: "Soy Sauce", quantity: "1", expirationDate: "2026-01-05"},
    {name: "Frozen pie crust", quantity: "1", expirationDate: "2026-07-31"},
    {name: "Gochujang", quantity: "1", expirationDate: "2024-07-31"},
    {name: "Onions", quantity: "2", expirationDate: "2024-07-28"},
]

function IngredientTable() {
    return(
        <table>
            <tr>
                <th>Ingredient Name</th>
                <th>Quantity</th>
                <th>Expiration Date</th>
                <th>Actions</th>
            </tr>
            {ingredients.map((ingredient, key) => {
                return (
                    <tr key={key}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity}</td>
                        <td>{ingredient.expirationDate}</td>
                    </tr>
                )
            })}
        </table>
    );
}
export default IngredientTable;