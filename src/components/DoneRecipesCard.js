import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Share from '../images/share2.png';
import '../pages/css/DoneRecipes.css';

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
    <div className="done-list-container">
      <Link
        to={ recipe.type === 'meal' ? `/meals/${recipe.id}`
          : `/drinks/${recipe.id}` }
        className="done-link"
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="recipe-img"
          width="150px"
          className="done-img"
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

      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

      {recipe.type === 'meal'
      && (
        recipe.tags.map((tag, i) => (
          <p
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `tag-${i}` }
          >
            {tag}
          </p>))
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
    </div>
  );
}

DoneRecipesCard.propTypes = {}.isRequired;

export default DoneRecipesCard;
