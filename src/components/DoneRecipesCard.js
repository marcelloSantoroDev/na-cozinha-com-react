import React from 'react';
import Share from '../images/shareIcon.svg';

function DoneRecipesCard(props) {
  const { recipe, index } = props;
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.img }
        alt="recipe-img"
      />

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

      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

      {recipe.type === 'meal'
      && (
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
          {recipe.tags}
        </p>
      )}

      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img src={ Share } alt="share-icon" />
      </button>
    </div>
  );
}

DoneRecipesCard.propTypes = {}.isRequired;

export default DoneRecipesCard;
