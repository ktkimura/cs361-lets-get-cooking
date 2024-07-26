import React from 'react';

function HelpPage(){
    return(
        <>
            <h2>Help</h2>
            <article>
                <h3>How do I add a new recipe?</h3>
                <p>
                There are two methods of adding a new recipe: manually typing details OR providing a valid hyperlink to a recipe posting online. 
                For the latter, the application will extract the listed ingredients and instructions for you. 
                </p>
            </article>
            <article>
                <h3>How do I edit a recipe?</h3>
                <p>
                To edit a recipe, navigate to the Recipes page and click the “Edit” button in the appropriate recipe row. 
                This will direct you to an editing page. Note that changes are only saved if the “Save Changes” button is clicked. 
                Otherwise, all changes made will be lost. 
                </p>
            </article>
            <article>
                <h3>How do I delete a recipe?</h3>
                <p>
                To delete a recipe, navigate to the Recipes page and click the “Delete” button in the appropriate recipe row. 
                A popup will display to ensure that you want to delete the recipe. 
                Upon clicking the “Confirm” button, the recipe will be <strong>permanently</strong> removed from the Recipes page.
                </p>
            </article>
        </>
    );
}
export default HelpPage;