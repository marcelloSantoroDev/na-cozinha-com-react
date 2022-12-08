import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null) {
      setDoneRecipes(getDoneRecipes);
    }
  }, []);
  return (
    <section>
      <Header
        title="Done Recipes"
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipes.map((recipe, index) => (
          <DoneRecipesCard key={ `done-recipes-${index}` } recipe={ recipe } />
        ))}
      </div>
    </section>
  );
}

export default DoneRecipes;
