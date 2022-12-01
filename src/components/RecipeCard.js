import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RecipeCard(props) {
  const { pathname } = useLocation();
  const { recipe, index } = props;

  const id = pathname === '/meals' ? recipe.idMeal : recipe.idDrink;
  const thumb = pathname === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const recipeName = pathname === '/meals' ? recipe.strMeal : recipe.strDrink;

  return (
    <Link
      to={ `${pathname}/${id}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ thumb }
        alt={ `${recipeName} img` }
        width="300px"
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>
        {recipeName}
      </span>
    </Link>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
