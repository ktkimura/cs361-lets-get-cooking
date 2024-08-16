import json, time, os
from recipe_scrapers import scrape_html

commFilePath = 'commPipeB.json'
cleanupFilePath = '../microC/commPipeC.json'

# check the edit times of the file to determine if change was made
def fileChange(file):
    lastEditTime= os.path.getmtime(file)
    while True:
        newEditTime = os.path.getmtime(file)
        if lastEditTime != newEditTime:
            return 1


def writeOutput(jsonData):
    with open(cleanupFilePath, 'w') as outputFile:
        json.dump(jsonData, outputFile, indent=4)
        outputFile.close()


def getRecipeDetails(recipeLink):
    # attempt to use recipe-scrapers library to get recipe data
    try:
        scraper = scrape_html(html=None, org_url=recipeLink, online=True)
        recipeName = scraper.title()
        recipeIngredients = scraper.ingredients()
        recipeInstruct = scraper.instructions()

        recipeObj = {"name":  recipeName,  "ingredients": recipeIngredients, "instructions": recipeInstruct}
        
        writeOutput(recipeObj)
        time.sleep(1)

        with open(cleanupFilePath, 'r') as readFile:
            recipeObj = json.load(readFile)
            return recipeObj
    # if user input was invalid, pass back error to main program
    except:
        print("An error occurred with parsing the provided hyperlink")
        errorObj = {"error": "error getting recipe details"}
        return errorObj



while True:
    print("Awaiting input...")

    if fileChange(commFilePath) == 1:
        with open(commFilePath, 'r') as inputFile:
            # to give main program some time to write link to file
            time.sleep(1)

            # parse out the hyperlink
            fileData = json.load(inputFile)
            recipeLink = fileData["link"]
            
            inputFile.close()
        
        with open(commFilePath, 'w') as outputFile:
            rawRecipeObj = getRecipeDetails(recipeLink)
            json.dump(rawRecipeObj, outputFile, indent=4)

            outputFile.close()

    print("commPipeB.json was updated")

