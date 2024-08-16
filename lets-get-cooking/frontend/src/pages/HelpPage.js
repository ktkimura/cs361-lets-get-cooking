import React from 'react';

function HelpPage(){
    return(
        <>
            <h2>Help</h2>
            <div class="helpSection">
                <h3>Ingredients</h3>
                <article>
                    <strong>How do I add a new ingredient?</strong>
                    <p>
                     To add a new ingredient, navigate to the Pantry page 
                    </p>
                </article>
                <article>
                    <strong>How do I delete an ingredient?</strong>
                    <p>
                    To delete an ingredient, navigate to the Pantry page and click the “Delete” button in the appropriate ingredient row. 
                    A popup will display to ensure that you want to delete the ingredient. 
                    Upon clicking the “Confirm” button, the ingredient will be <strong>permanently</strong> removed from the Pantry page.
                    </p>
                </article>
            </div>
            <div class="helpSection">
                <h3>Recipes</h3>
                <article>
                    <strong>How do I add a new recipe?</strong>
                    <p>
                    To add a new recipe, navigate to the Recipes page. There are two buttons for adding a recipe, with one being for manual addition and the other being for hyperlink addition. 
                    For the former, you will need to specify at least the recipe name (ingredients and instructions are not required fields). For the latter, you will need to provide a valid hyperlink to 
                    a recipe posting online and the application will extract the recipe name, ingredients and instructions for you. Please refer <a href="https://github.com/hhursev/recipe-scrapers">here</a> to browse the list
                    of valid website domains that this application can retrieve recipe data from. 
                    </p>
                </article>
                <article>
                    <strong>How do I edit a recipe?</strong>
                    <p>
                    To edit a recipe, navigate to the Recipes page and click the “Edit” button in the appropriate recipe row. 
                    This will direct you to an editing page. Note that changes are only saved if the “Save Changes” button is clicked. 
                    Otherwise, all changes made will be lost. 
                    </p>
                </article>
                <article>
                    <strong>How do I delete a recipe?</strong>
                    <p>
                    To delete a recipe, navigate to the Recipes page and click the “Delete” button in the appropriate recipe row. 
                    A popup will display to ensure that you want to delete the recipe. 
                    Upon clicking the “Confirm” button, the recipe will be <strong>permanently</strong> removed from the Recipes page.
                    </p>
                </article>
            </div>
        </>
    );
}
export default HelpPage;