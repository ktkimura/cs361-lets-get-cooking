import 'dotenv/config';
import express from 'express';
import * as ingredients from './model.mjs';  // Assuming model.mjs exports ingredient functions

const PORT = process.env.INGREDIENTS_PORT || 5001; // Use a different port for separation
const app = express();
app.use(express.json());  // REST API needs JSON MIME type


// CREATE Controller ******************************************
app.post('/ingredients', (req, res) => { 
    ingredients.createIngredient(
        req.body.name, 
        req.body.quantity, 
        req.body.expirationDate
    )
    .then(ingredient => {
        console.log(`"${ingredient.name}" was added to the ingredients collection.`);
        res.status(201).json(ingredient);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Ingredient could not be added due to an invalid request.' });
    });
});


// RETRIEVE All Ingredients ************************************
app.get('/ingredients', (req, res) => {
    ingredients.retrieveIngredients()
        .then(ingredientList => { 
            if (ingredientList !== null) {
                console.log(`All ingredients were retrieved.`);
                res.json(ingredientList);
            } else {
                res.status(404).json({ Error: 'No ingredients found in the collection.' });
            }         
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Ingredients could not be found due to an invalid request.' });
        });
});


// RETRIEVE by ID **********************************************
app.get('/ingredients/:_id', (req, res) => {
    ingredients.retrieveIngredientByID(req.params._id)
    .then(ingredient => { 
        if (ingredient !== null) {
            console.log(`"${ingredient.name}" was retrieved based on ID.`);
            res.json(ingredient);
        } else {
            res.status(404).json({ Error: 'The requested ingredient does not exist.' });
        }         
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Ingredient could not be retrieved due to an invalid request.' });
    });
});


// UPDATE Controller ********************************************
app.put('/ingredients/:_id', (req, res) => {
    ingredients.updateIngredient(
        req.params._id, 
        req.body.name, 
        req.body.quantity, 
        req.body.expirationDate
    )
    .then(ingredient => {
        console.log(`"${ingredient.name}" was updated.`);
        res.json(ingredient);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Ingredient could not be updated due to an invalid request.' });
    });
});


// DELETE Controller ********************************************
app.delete('/ingredients/:_id', (req, res) => {
    ingredients.deleteIngredientById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} ingredient was deleted.`);
                res.status(200).send({ Success: 'Ingredient was successfully deleted.' });
            } else {
                res.status(404).json({ Error: 'The requested ingredient does not exist.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Ingredient could not be deleted due to an invalid request.' });
        });
});


// Start the server on the designated PORT
app.listen(PORT, () => {
    console.log(`Ingredient service running on port ${PORT}...`);
});
