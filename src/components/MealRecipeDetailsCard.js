import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkToDrinkRecomendations } from '../redux/actions';

function RecipeDetailsCard(props) {
  const { details } = props;
  const { strMeal,
    strCategory, strMealThumb, strInstructions, strYoutube } = details;
  const embedId = strYoutube.split('=')[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkToDrinkRecomendations());
  }, [dispatch]);

  const { strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20 } = details;

  const { strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  } = details;

  const measureArray = [strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20];

  const ingredientsArray = [strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20];

  const filteredIngredients = ingredientsArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const filteredMeasures = measureArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const arrayToMap = filteredIngredients.map((e, i) => `${filteredMeasures[i]} of ${e} `);

  return (
    <div className="meal-details-container">
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
        width="200px"
      />
      <h2 data-testid="recipe-category">{strCategory}</h2>
      <ul>
        { arrayToMap.map((e, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ e + index }
          >
            {e}

          </li>
        )) }
      </ul>
      <h3 data-testid="instructions">{strInstructions}</h3>
      <iframe
        data-testid="video"
        title={ strMeal }
        src={ `https://www.youtube.com/embed/${embedId}` }
        frameBorder="0"
      />
    </div>
  );
}

RecipeDetailsCard.propTypes = {}.isRequired;

export default RecipeDetailsCard;
