# Let's Get Cooking!
A web application that helps you get cooking faster by serving as a digital pantry and recipe book. 

*This project was developed for my CS361 (Software Engineering I) course at Oregon State University during the Summer 2024 Term*

## Main Features
- Ingredient and Recipe databases
  - Perform CRUD (Create, Read, Update, Delete) options on ingredients and recipes you wish to store
  - Add recipes manually and by providing a valid hyperlink [(More details on valid websites here)](https://github.com/hhursev/recipe-scrapers?tab=readme-ov-file#scrapers-available-for)
- Ingredient Comparison
   - When viewing a recipe, automatically see which ingredients from the recipe are currently in your pantry
- Expired Ingredients Checker
   - With a click of a button, see a list of ingredients whose expiration dates are before the current date

## Technologies Used
- React
- Node.js
- Express
- JavaScript
- HTML
- CSS
- Python
- [recipe-scrapers library](https://github.com/hhursev/recipe-scrapers)

[![My Skills](https://skillicons.dev/icons?i=react,nodejs,express,js,html,css,python)](https://skillicons.dev)

## Architecture
This application utilizes a microservice architecture on the backend to enhance modularity and improve maintenance. The microservice programs were primarily written in Python and use JSON files as communication pipes. 

Three of the four microservices this application uses can be found in the following repos:
- [Expired Ingredient Checker](https://github.com/ktkimura/expired-ingredients-checker)
- [Add Recipe by Hyperlink](https://github.com/ktkimura/add-recipe-api)
- [Ingredient String Cleaner](https://github.com/ktkimura/clean-ingredient-strings-microservice)

> [!NOTE]
> Given that the remaining microservice was coded by one of my classmates and is in a private repo, I have chosen to not disclose it


<!--
## How to start up the website
> [!NOTE]
> You must have git downloaded to your system. Download git [here](https://git-scm.com/downloads)

1. In your command line interface of choice, navigate to the directory you want to download the code to
   - For example, `$user/Documents/projects`
2. Run the following git command: `git clone https://github.com/ktkimura/cs361-lets-get-cooking.git`. You now have a copy of this repository!
3. Install all necessary dependencies for both frontend and backend
   - For the frontend, navigate to the "lets-get-cooking/frontend" directory and run the command `npm install`
   - For the backend, navigate to the "lets-get-cooking/backend" directory and run the command `npm install` AND `pip install -r requirements.txt`
4. Start up the website by running the command, `npm start` in both the "lets-get-cooking/frontend" and "lets-get-cooking/backend" directories.
5. Get all microservices running by executing the following files: 
6. Navigate to http://localhost:3000 to view the website!
-->
 
