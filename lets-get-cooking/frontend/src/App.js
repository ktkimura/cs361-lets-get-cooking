// Import dependencies
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Import components
import Navigation from './components/Navigation';

// Import pages
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import PantryPage from './pages/PantryPage';
import HelpPage from './pages/HelpPage';
import AddIngredientPage from './pages/AddIngredientPage';
import EditIngredientPage from './pages/EditIngredientPage';
import ViewRecipePage from './pages/ViewRecipePage';
import AddRecipeManualPage from './pages/AddRecipeManualPage';
import AddRecipeLinkPage from './pages/AddRecipeLinkPage';
import EditRecipePage from './pages/EditRecipePage';


function App() {
  return (
    <>
      <BrowserRouter>
        <header>
            <h1>Let's Get Cooking!</h1>
            <Navigation />
        </header>
        <main>
          <section>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/recipes" element={<RecipesPage />}></Route>
              <Route path="/pantry" element={<PantryPage />}></Route>
              <Route path="/help" element={<HelpPage />}></Route>

              <Route path="/addIngredient" element={<AddIngredientPage />}></Route>
              <Route path="/editIngredient/:id" element={<EditIngredientPage />}></Route>
              <Route path="/viewRecipe/:id" element={<ViewRecipePage />}></Route>
              <Route path="/addRecipeManual" element={<AddRecipeManualPage />}></Route>
              <Route path="/addRecipeLink" element={<AddRecipeLinkPage />}></Route>
              <Route path="/editRecipe/:id" element={<EditRecipePage />}></Route>
            </Routes>
          </section>
        </main>
        <footer>
              <p>&copy; 2024 Katie Kimura.</p>
        </footer>
      </BrowserRouter>
      
    </>
  );
}

export default App;
