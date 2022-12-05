import React from 'react';
import './css/Recomendations.css';

function DrinkRecomendationCard(props) {
  const { recomendation, index } = props;
  const { strDrink, strDrinkThumb } = recomendation;

  return (
    <div className="recomendation-card" data-testid={ `${index}-recommendation-card` }>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <p data-testid={ `${index}-recommendation-title` }>{ strDrink }</p>
    </div>
  );
}

DrinkRecomendationCard.propTypes = {}.isRequired;

export default DrinkRecomendationCard;
