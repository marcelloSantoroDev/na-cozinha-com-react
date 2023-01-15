import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import Header from '../components/Header';
import './css/DoneRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [clickedButton, setClickedButton] = useState({ button: '' });
  const count = useSelector((state) => state.getCurrentFavoritesReducer.count);

  useEffect(() => {
    const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavRecipes !== null) {
      setFavoriteRecipes(getFavRecipes);
    }
  }, [count]);

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
  }, [clickedButton, count]);

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
