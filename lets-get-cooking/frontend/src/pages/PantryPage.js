import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function PantryPage(){

    const [ingredients, setIngredients] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading]         = useState(false)


    /*  Citation for getIngredients() and deleteIngredients() functions: 
    *   Date: 07/27/2024
    *   Adapted From: "CRUD App with React And JSON-Server" by Gohit Varanasi. Adapted functions to match context of my backend (ingredient data).
    *   Source URL: https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558 
    */
    function getIngredients() {
        setLoading(true);
        fetch("http://localhost:8000/ingredients")
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                setIngredients(result);
                console.log(ingredients);
            })
    }

    function deleteIngredient(ingredientID) {
        fetch(`http://localhost:8000/ingredients/${ingredientID}`, {
            method: 'DELETE',
        }).then(() => {
            getIngredients();
        });
    }
    

    useEffect(() => {
        getIngredients();
    })


    return(
        <>
            <h2>Pantry</h2>
            <br></br>
            <Link to="/addIngredient" class="btn">Add Ingredient</Link>
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
                            /* each row in table has its own edit and delete button that will auto-populate with that row's ingredient data */
                            <Link to={`/editIngredient/${ingredient.id}`} class="btn">Edit</Link>
                            <button onClick={() => deleteIngredient(ingredient.id)}>Delete</button> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        </>
    );
}

export default PantryPage;