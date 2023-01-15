import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import './css/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [clickedButton, setClickedButton] = useState({
    button: '',
  });
  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null) {
      setDoneRecipes(getDoneRecipes);
    }
  }, []);

  useEffect(() => {
    const { button } = clickedButton;
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null && button === 'Meals') {
      const filteredMeals = getDoneRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(filteredMeals);
    } else if (getDoneRecipes !== null && button === 'Drinks') {
      const filteredDrinks = getDoneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(filteredDrinks);
    } else if (getDoneRecipes !== null && button === 'All') {
      setDoneRecipes(getDoneRecipes);
    }
  }, [clickedButton]);

  const handleFilterClick = ({ target }) => {
    const { name, value } = target;
    setClickedButton({
      ...clickedButton,
      [name]: value,
    });
  };
  return (
    <section>
      <Header
        title="Done Recipes"
      />
      <div className="done-btns-container">
        <button
          type="button"
          name="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ handleFilterClick }
          className="done-btn"
        >
          All
        </button>

        <button
          type="button"
          name="button"
          data-testid="filter-by-meal-btn"
          value="Meals"
          onClick={ handleFilterClick }
          className="done-btn"
        >
          Meals
        </button>

        <button
          type="button"
          name="button"
          data-testid="filter-by-drink-btn"
          value="Drinks"
          onClick={ handleFilterClick }
          className="done-btn"
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipes.map((recipe, index) => (
          <DoneRecipesCard
            key={ `done-recipes-${index}` }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </section>
  );
}

export default DoneRecipes;
