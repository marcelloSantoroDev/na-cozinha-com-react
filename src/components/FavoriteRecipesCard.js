import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import Share from '../images/shareIcon.svg';
import { getCurrentFavorites } from '../redux/actions';

function FavoriteRecipesCard(props) {
  const { recipe, index } = props;
  const { id } = recipe;
  const [isThisRecipeShared, setIsThisRecipeShared] = useState(false);
  const dispatch = useDispatch();

  const handleUnfavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = favoriteRecipes.filter((subject) => subject.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    dispatch(getCurrentFavorites(filteredFavorites.length));
  };

  const handleShareClick = () => {
    setIsThisRecipeShared(true);
    const url = window.location.href.split('favorite-recipes')[0];
    if (recipe.type === 'meal') {
      const mealUrl = url.concat('', `meals/${recipe.id}`);
      copy(mealUrl);
    } else {
      const drinkUrl = url.concat('', `drinks/${recipe.id}`);
      copy(drinkUrl);
    }
  };
  return (
    <div>
      <Link
        to={ recipe.type === 'meal' ? `/meals/${recipe.id}`
          : `/drinks/${recipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="recipe-img"
          width="150px"
        />
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>

      {recipe.type === 'meal'
      && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}`}
        </p>
      )}

      {recipe.type === 'drink'
      && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </p>
      )}

      {isThisRecipeShared && <p>Link copied!</p>}
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShareClick }
        src={ Share }
      >
        <img src={ Share } alt="share-icon" />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ handleUnfavoriteClick }
        src={ blackHeart }
      >
        <img
          src={ blackHeart }
          alt="unfavorite meal"
        />
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {}.isRequired;

export default FavoriteRecipesCard;
