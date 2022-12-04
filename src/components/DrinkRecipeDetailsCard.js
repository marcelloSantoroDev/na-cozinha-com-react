import React from 'react';

function DrinkRecipeDetailsCard(props) {
  const { details: { strDrink, strAlcoholic, strDrinkThumb } } = props;
  return (
    <div className="drink-details-container">
      <h1>{strDrink}</h1>
      <img src={ strDrinkThumb } alt={ strDrink } width="200px" />
      <h2>{strAlcoholic}</h2>
    </div>
  );
}

DrinkRecipeDetailsCard.propTypes = {}.isRequired;

export default DrinkRecipeDetailsCard;
