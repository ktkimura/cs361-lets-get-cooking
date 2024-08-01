const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

app.get("/pantry", (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', function (err,data) {
        if (err) {
            console.error(err);
        } 
        const jsonData = JSON.parse(data);
        const ingredients = jsonData.ingredients;
        console.log(ingredients);
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

