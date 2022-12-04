import React from 'react';

function RecipeDetailsCard(props) {
  const { details: { strMeal, strCategory, strMealThumb } } = props;
  return (
    <div className="meal-details-container">
      <h1>{strMeal}</h1>
      <img src={ strMealThumb } alt={ strMeal } width="200px" />
      <h2>{strCategory}</h2>
    </div>
  );
}

RecipeDetailsCard.propTypes = {}.isRequired;

export default RecipeDetailsCard;
