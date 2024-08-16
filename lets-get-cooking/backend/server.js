const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');
const watch = require('node-watch');

// Citation for async sleep function 
// 08/14/2024
// Copied from Stack Overflow discussion from user Dan Dascalescu's answer
// Source URL: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));

const dataFilePath = path.join(__dirname, 'data.json');
const compareFilePath = path.join(__dirname, 'microA/ingredientCompare.json');
const compareOutputFilePath = path.join(__dirname, 'microA/ingredient.json');
const commPipeBFilePath = path.join(__dirname, 'microB/commPipeB.json');

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

// Ingredient-related Routing
app.get("/pantry", (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', function (err,data) {
        if (err) {
            console.error(err);
        } 
        const jsonData = JSON.parse(data);
        const ingredients = jsonData.ingredients;
        res.json(ingredients);
    });
});

app.post("/addIngredient", (req, res) => {
    const newIngredient = {
        id: uuidv4(),
        name: req.body.name,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
    };

    fs.readFile(dataFilePath, 'utf-8', function (err, data) {
        let jsonData = JSON.parse(data);
        jsonData.ingredients.push(newIngredient);
    
        // use "null, 2" in JSON.stringify() to preserve format of data.json for viewing purposes
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            } 
            else {
                console.log(`${newIngredient.name} was added to the database!`)
            }
        })
    })
    res.status(200).json({ message: 'Ingredient added successfully', ingredient: newIngredient });
});

app.get("/editIngredient/:id", (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        let jsonData = JSON.parse(data);
        const ingredientToEdit = jsonData.ingredients.find(ingredient => ingredient.id === req.params.id);

        res.status(200).json(ingredientToEdit);
    });
});

app.put("/editIngredient/:id", (req, res) => {
    const updatedIngredient = {
        id: req.params.id,     //dynamically grab the requested ingredient ID from the URL
        name: req.body.name,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
    };

    fs.readFile(dataFilePath, 'utf-8', function (err, data) {
        let jsonData = JSON.parse(data);
        
        const ingredientIdx = jsonData.ingredients.findIndex(ingredient => ingredient.id === updatedIngredient.id);     //check data.json to find idx of ingredient requested
        jsonData.ingredients[ingredientIdx] = updatedIngredient;

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            }
            else{
                console.log(`${updatedIngredient.name} was updated!`)
            }
        })
    });
    res.status(200).json({ message: 'Ingredient updated successfully', ingredient: updatedIngredient });
});

app.delete("/deleteIngredient/:id", (req, res) => {
    const ingredientID = req.params.id;

    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        let jsonData = JSON.parse(data);
        jsonData.ingredients = jsonData.ingredients.filter(ingredient => ingredient.id !== ingredientID);

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            }
            console.log("Successfully deleted ingredient!");
            res.status(200).json(jsonData.ingredients);
        });
    });
});

// Recipe-related Routing
app.get("/recipes", (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', function(err,data) {
        if (err) {
            console.error(err);
        } 
        else{
            const jsonData = JSON.parse(data);
            const recipes = jsonData.recipes;
            res.json(recipes);
        }
    })
});

async function requestCompare(requestMsg) {
    await fsPromises.writeFile(compareFilePath, JSON.stringify(requestMsg, null, 2));
};

async function receiveCompare() {
    const data = await fsPromises.readFile(compareOutputFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return [jsonData.outOfStock, jsonData.inStock];
};

app.get("/viewRecipe/:id", async (req, res) => {
    const recipeID = req.params.id;

    const data = await fsPromises.readFile(dataFilePath, 'utf-8');
    let jsonData = JSON.parse(data);
    const recipeToView = jsonData.recipes.find(recipe => recipe.id === recipeID);
    const ingredientList = jsonData.ingredients;

    let requestMsg = {
        "ingredients" : ingredientList,
        "recipe" : [recipeToView]
    };

    await requestCompare(requestMsg);
    const receivedMsg = await receiveCompare();

    res.status(200).json({ recipe: recipeToView, compareIngredient: receivedMsg });
});


async function requestRecipeDetails(requestMsg) {
    await fsPromises.writeFile(commPipeBFilePath, JSON.stringify(requestMsg, null, 2));
};

async function receiveRecipeDetails() {
    const data = await fsPromises.readFile(commPipeBFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    console.log('Received JSON Data:', jsonData);

    return jsonData;
};

app.post("/addRecipeLink", async (req, res) => {
    const recipeLink = req.body.recipeLink;

    let requestMsg = { "link": recipeLink };

    await requestRecipeDetails(requestMsg)
    await sleep(5000); 
    const receivedMsg = await receiveRecipeDetails()
    
    if (receivedMsg.error) {
        res.status(400).json({ message: 'Recipe data could not be retrieved', error: receivedMsg.error })
    } else {
        const newRecipe = {
            id: uuidv4(),
            name: receivedMsg.name,
            ingredients: receivedMsg.ingredients,
            instructions: receivedMsg.instructions,
        };
    
        const data = await fsPromises.readFile(dataFilePath, 'utf-8');
        let currentData = JSON.parse(data);
        currentData.recipes.push(newRecipe);
    
        await fsPromises.writeFile(dataFilePath, JSON.stringify(currentData, null, 2));
    
        res.status(200).json({ message: 'Recipe added successfully', recipe: newRecipe });
    }
}); 


app.post("/addRecipeManual", (req, res) => {
    const newRecipe = {
        id: uuidv4(),
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    };

    fs.readFile(dataFilePath, 'utf-8', function (err, data) {
        let jsonData = JSON.parse(data);
        jsonData.recipes.push(newRecipe);
    
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            } 
            else {
                console.log(`${newRecipe.name} was added to the database!`)
            }
        })
    })
    res.status(200).json({ message: 'Recipe added successfully', recipe: newRecipe });
});




app.get("/editRecipe/:id", (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        let jsonData = JSON.parse(data);
        const recipeToEdit = jsonData.recipes.find(recipe => recipe.id === req.params.id);

        res.status(200).json(recipeToEdit);
    });
});

app.put("/editRecipe/:id", (req, res) => {
    const updatedRecipe = {
        id: req.params.id,     //dynamically grab the requested ingredient ID from the URL
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    };

    fs.readFile(dataFilePath, 'utf-8', function (err, data) {
        let jsonData = JSON.parse(data);
        
        const recipeIdx = jsonData.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);     
        jsonData.recipes[recipeIdx] = updatedRecipe;

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            }
            else{
                console.log(`${updatedRecipe.name} was updated!`)
            }
        })
    });
    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
});

app.delete("/deleteRecipe/:id", (req, res) => {
    const recipeID = req.params.id;

    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        let jsonData = JSON.parse(data);
        jsonData.recipes = jsonData.recipes.filter(recipe => recipe.id !== recipeID);

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.error(err);
            }
            console.log("Successfully deleted recipe!");
            res.status(200).json(jsonData.recipes);
        });
    });
});

