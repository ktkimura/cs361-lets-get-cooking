import React from 'react';

const recipes = [
    {name: "Apple Pie", ingredients: ["Apples", "Pie Crust", "White Sugar", "Brown Sugar", "Flour", "Cinnamon", "Nutmeg", "Egg", "Lemon"]},
    {name: "Miso Salmon", ingredients: ["Salmon", "Soy Sauce", "Mirin", "Miso", "Sesame Oil"]},
    {name: "Garlic Shrimp", ingredients: ["Shrimp", "Garlic", "Oil", "Salt", "Pepper"]},
    {name: "Spicy Tofu Stew", ingredients: ["Gochujang", "Tofu", "White Onion", "Green Onion", "Water", "Red Pepper Flakes", "Soy Sauce", "White Sugar"]},
    {name: "Kimchi Fried Rice", ingredients: ["Rice", "Kimchi", "Egg", "Vegetable Oil", "Sesame Oil", "Green Onion", "Soy Sauce", "White Sugar"]},
    {name: "Brown Butter Chocolate Chip Cookies", ingredients: ["Flour", "Baking Soda", "Salt", "Unsalted Butter", "Brown Sugar", "Eggs", "Vanilla", "Chocolate Chips"]},

]

function RecipeTable() {
    return(
        <table>
            <tr>
                <th>Recipe Name</th>
                <th>Ingredients</th>
                <th>Actions</th>
            </tr>
            {recipes.map((recipe, key) => {
                return (
                    <tr key={key}>
                        <td>{recipe.name}</td>
                        <td>{recipe.ingredients.join(", ")}</td>
                    </tr>
                )
            })}
        </table>
    );
}
export default RecipeTable;