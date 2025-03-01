import mongoose, { mongo } from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Connection to Cluster0 database\' recipes collection failed.' });
    } else  {
        console.log('Success: Connection to Cluster0 database\'s recipes collection successful!');
    }
});

// INGREDIENTS
const ingredientSchema = mongoose.Schema({
    name:               { type: String,
                          required: true },
    quantity:           { type: String,
                          required: String },
    expirationDate:     { type: Date,
                          required: true,
                          default: Date.now }
})

const ingredients = mongoose.model('Ingredients', ingredientSchema)

// CREATE model
const createIngredient = async (name, quantity, expirationDate) => {
    const ingredient = new ingredients({ 
        name: name,
        quantity: quantity,
        expirationDate: expirationDate
    });
    return ingredient.save();
}


// RETRIEVE model 
// Retrieve all documents and return a promise.
const retrieveIngredients = async () => {
    const query = ingredients.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveIngredientByID = async (_id) => {
    const query = ingredients.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id 
const deleteIngredientById = async (_id) => {
    const result = await ingredients.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model
const updateIngredient = async (_id, name, quantity, expirationDate) => {
    const result = await Ingredients.replaceOne({_id: _id }, {
        name: name,
        quantity: quantity,
        expirationDate: expirationDate
    });
    return { 
        _id: _id, 
        name: name,
        quantity: quantity,
        expirationDate: expirationDate
    }
}

// RECIPES
const recipeSchema = mongoose.Schema({
    name:               { type: String,
                          required: true },
    ingredients:        [{ type: ingredientSchema,
                          required: true }],
    instructions:       { type: String,
                          required: true }
})

const recipes = mongoose.model('Recipes', recipeSchema)


// CREATE model
const createRecipe = async (name, ingredients, instructions) => {
    const recipe = new Recipe({ 
        name: name,
        ingredients: ingredients, 
        instructions: instructions
    });
    return recipe.save();
};

// RETRIEVE model 
// Retrieve all documents and return a promise.
const retrieveRecipes = async () => {
    const query = recipes.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveRecipeByID = async (_id) => {
    const query = recipes.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id 
const deleteRecipeById = async (_id) => {
    const result = await recipes.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model
const updateRecipe = async (_id, name, ingredients, instructions) => {
    const result = await Recipe.replaceOne(
        { _id: _id },
        {
            name: name,
            ingredients: ingredients,
            instructions: instructions
        }
    );
    
    return { 
        _id: _id, 
        name: name,
        ingredients: ingredients,
        instructions: instructions
    };
};



// EXPORT the variables for use in the controller file.
export { createIngredient, retrieveIngredients, retrieveIngredientByID, deleteIngredientById, updateIngredient }
export { createRecipe, retrieveRecipes, retrieveRecipeByID, deleteRecipeById, updateRecipe }

