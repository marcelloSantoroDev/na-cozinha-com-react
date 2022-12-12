import React, { useEffect, useState } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [clickedButton, setClickedButton] = useState({
    button: '',
  });
  useEffect(() => {
    const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavRecipes !== null) {
      setFavoriteRecipes(getFavRecipes);
    }
  }, []);

  useEffect(() => {
    const { button } = clickedButton;
    const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavRecipes !== null && button === 'Meals') {
      const filteredMeals = getFavRecipes.filter((recipe) => recipe.type === 'meal');
      setFavoriteRecipes(filteredMeals);
    } else if (getFavRecipes !== null && button === 'Drinks') {
      const filteredDrinks = getFavRecipes.filter((recipe) => recipe.type === 'drink');
      setFavoriteRecipes(filteredDrinks);
    } else if (getFavRecipes !== null && button === 'All') {
      setFavoriteRecipes(getFavRecipes);
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
        title="Favorite Recipes"
      />
      <div>
        <button
          type="button"
          name="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ handleFilterClick }
        >
          All
        </button>

        <button
          type="button"
          name="button"
          data-testid="filter-by-meal-btn"
          value="Meals"
          onClick={ handleFilterClick }
        >
          Meals
        </button>

        <button
          type="button"
          name="button"
          data-testid="filter-by-drink-btn"
          value="Drinks"
          onClick={ handleFilterClick }
        >
          Drinks
        </button>
      </div>
      <div>
        {favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipesCard
            key={ `favorite-recipes-${index}` }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </section>
  );
}

export default FavoriteRecipes;
