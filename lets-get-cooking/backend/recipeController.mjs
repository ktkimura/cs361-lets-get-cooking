import 'dotenv/config';
import express from 'express';
import * as recipes from './model.mjs';  // Assuming model.mjs exports recipe functions

const PORT = process.env.INGREDIENTS_PORT || 5001; // Use a different port for separation
const app = express();
app.use(express.json());  // REST API needs JSON MIME type


// CREATE Controller ******************************************
app.post('/recipes', (req, res) => { 
    recipes.createRecipe(
        req.body.name, 
        req.body.ingredients, 
        req.body.instructions
    )
    .then(recipe => {
        console.log(`"${recipe.name}" was added to the recipes collection.`);
        res.status(201).json(recipe);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Recipe could not be added due to an invalid request.' });
    });
});


// RETRIEVE All Recipes ************************************
app.get('/recipes', (req, res) => {
    recipes.retrieveIngredients()
        .then(RecipeList => { 
            if (RecipeList !== null) {
                console.log(`All recipes were retrieved.`);
                res.json(RecipeList);
            } else {
                res.status(404).json({ Error: 'No recipes found in the collection.' });
            }         
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Recipes could not be found due to an invalid request.' });
        });
});


// RETRIEVE by ID **********************************************
app.get('/recipes/:_id', (req, res) => {
    recipes.retrieveRecipeByID(req.params._id)
    .then(recipe => { 
        if (recipe !== null) {
            console.log(`"${recipe.name}" was retrieved based on ID.`);
            res.json(recipe);
        } else {
            res.status(404).json({ Error: 'The requested recipe does not exist.' });
        }         
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Recipe could not be retrieved due to an invalid request.' });
    });
});


// UPDATE Controller ********************************************
app.put('/recipes/:_id', (req, res) => {
    recipes.updateRecipe(
        req.params._id, 
        req.body.name, 
        req.body.ingredients, 
        req.body.instructions
    )
    .then(recipe => {
        console.log(`"${recipe.name}" was updated.`);
        res.json(recipe);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Recipe could not be updated due to an invalid request.' });
    });
});


// DELETE Controller ********************************************
app.delete('/recipes/:_id', (req, res) => {
    recipes.deleteIngredientById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} recipe was deleted.`);
                res.status(200).send({ Success: 'Recipe was successfully deleted.' });
            } else {
                res.status(404).json({ Error: 'The requested recipe does not exist.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Recipe could not be deleted due to an invalid request.' });
        });
});


// Start the server on the designated PORT
app.listen(PORT, () => {
    console.log(`Recipe service running on port ${PORT}...`);
});
