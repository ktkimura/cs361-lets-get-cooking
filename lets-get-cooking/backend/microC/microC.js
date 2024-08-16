const fs = require('fs');
const watch = require('node-watch');

const commFilePath = "./commPipeC.json";


function writeOutput([jsonData, ingredientArr]) {
    jsonData.ingredients = ingredientArr;

    fs.writeFile(commFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error(err)
        }
    });
};

function removeMeasurements(jsonData) {
    // account for \d (digits) \s (spaces) [\u2150-\u215E] (fractions) and various measurement types
    // * indicates 0 or more instances and ? indicates that character RIGHT BEFORE it is optional (ex. cups? counts cup and cups)
    const measurementRegex = /^\d*\s*(½|¼|⅓|⅔|⅛|¾|⅕|⅖|⅗|⅘|⅙|⅚|⅛)?\s*\b(cups?|teaspoons?|tablespoons?|tsp|tbsp|ounces?|oz|grams?|g|pounds?|lbs?|pinch|dash|milliliters?|ml|liters?|l)?\b\s*/i;
    
    // capture any potential commas and spaces before the detail phrase
    // \b ensures that the entire specified phrase is matched
    const detailRegex = /(?:,\s*|\s*;?\s*|\s+)?\b(or more to taste|melted|softened|finely chopped|diced|chopped|to taste|(chopped)|(diced)|prepared)\b\s*/i;

    let updatedIngredientsArr = jsonData.ingredients.map(ingredient => {
        editedIngredient = ingredient.replace(measurementRegex, '').trim();
        editedIngredient = editedIngredient.replace(detailRegex, '').trim();
        return editedIngredient
    });

    writeOutput([jsonData, updatedIngredientsArr]);
};


function watchFile() {  
    console.log("Awaiting changes to commPipeC.json...");
  
    watch(commFilePath, (evt, name) => {
        if (evt === "update") {
            fs.readFile(commFilePath, function (err, data) {
                if (err) {
                    console.error(err)
                } else {
                    const fileContents = JSON.parse(data);
                    if (fileContents.name && fileContents.ingredients && fileContents.instructions) {
                        removeMeasurements(fileContents)  
                    }
                    
                }
            });
        } 
    }); 
};

watchFile();