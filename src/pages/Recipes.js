import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import './css/Recipes.css';

function Recipes() {
  const location = useLocation();
  const recipes = useSelector((state) => state.getRecipesReducer.recipes);
  const TWELVE = 12;
  return (
    <>
      <Header
        showSearch
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <section className="cards-container">
        { recipes !== null
            && recipes.filter((_e, i) => i < TWELVE).map((recipe, index) => (
              <RecipeCard
                key={ location.pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
                index={ index }
                recipe={ recipe }
              />
            ))}
      </section>
      <Footer />
    </>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
