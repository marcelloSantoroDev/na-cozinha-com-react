import React from 'react';
import './css/Recomendations.css';

function MealRecomendationsCard(props) {
  const { recomendation, index } = props;
  const { strMeal, strMealThumb } = recomendation;

  return (
    <div className="recomendation-card" data-testid={ `${index}-recommendation-card` }>
      <img
        src={ strMealThumb }
        alt={ strMeal }
      />
      <p data-testid={ `${index}-recommendation-title` }>{strMeal}</p>
    </div>
  );
}

MealRecomendationsCard.propTypes = {}.isRequired;

export default MealRecomendationsCard;
