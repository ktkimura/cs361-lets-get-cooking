const fs = require('fs');
const watch = require('node-watch');

const commFilePath = "./commPipeD.json";


function writeOutput(expiredIngredients) {
    let jsonData = {expiredIngredients}

    fs.writeFile(commFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error(err)
        }
    });
};

function findExpiredIngredients(ingredientsArr){
    const rawDate = Date();
    const currentDate = Date.parse(rawDate);

    let expiredIngredientsArr = [];
    ingredientsArr.map(ingredient => {
        if (Date.parse(ingredient.expirationDate) < currentDate) {
            expiredIngredientsArr.push(ingredient);
        }
    });

    writeOutput(expiredIngredientsArr);
};


function watchFile() {  
    console.log("Awaiting changes to commPipeD.json...");
  
    watch(commFilePath, (evt, name) => {
        if (evt === "update") {
            fs.readFile(commFilePath, function (err, data) {
                if (err) {
                    console.error(err)
                } else {
                    const fileContents = JSON.parse(data);
                    if (fileContents.ingredients) {
                        findExpiredIngredients(fileContents.ingredients);
                    }
                }
            });
        } 
    }); 
};

watchFile();