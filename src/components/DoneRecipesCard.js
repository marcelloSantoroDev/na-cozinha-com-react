import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function DoneRecipesCard(props) {
  const { recipe, index } = props;
  const [isThisRecipeShared, setIsThisRecipeShared] = useState(false);

  const handleShareClick = () => {
    setIsThisRecipeShared(true);
    const url = window.location.href.split('done-recipes')[0];
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
          src={ recipe.img }
          alt="recipe-img"
        />
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>

      {recipe.type === 'meal'
      && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.category} ${recipe.nationality}`}
        </p>
      )}

      {recipe.type === 'drink'
      && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </p>
      )}

      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

      {recipe.type === 'meal'
      && (
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
          {recipe.tags}
        </p>
      )}
      {isThisRecipeShared && <p>Link copied!</p>}
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShareClick }
      >
        <img src={ Share } alt="share-icon" />
      </button>
    </div>
  );
}

DoneRecipesCard.propTypes = {}.isRequired;

export default DoneRecipesCard;
