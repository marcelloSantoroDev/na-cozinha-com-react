import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkToMealRecomendations } from '../redux/actions';
import MealRecomendationsCard from './MealRecomendationsCard';
import './css/Recomendations.css';

function DrinkRecipeDetailsCard(props) {
  const { details } = props;
  const { strDrink, strAlcoholic, strDrinkThumb, strInstructions, strCategory } = details;
  const dispatch = useDispatch();
  const recomendations = useSelector((state) => state.getRecipesReducer.recomendations);
  const SIX = 6;

  useEffect(() => {
    dispatch(thunkToMealRecomendations());
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
  } = details;

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
    strMeasure15];

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
    strIngredient15];

  const filteredIngredients = ingredientsArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const filteredMeasures = measureArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const arrayToMap = filteredIngredients.map((e, i) => `${filteredMeasures[i]} of ${e} `);
  return (
    <section>
      <div className="drink-details-container">
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h4
          data-testid="recipe-category"
        >
          {`Category: ${strCategory}, ${strAlcoholic}`}

        </h4>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
          width="150px"
        />
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
        <h4>Instructions</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="recomendations-container">
        {recomendations.filter((_e, i) => i < SIX).map((recomendation, index) => (
          <MealRecomendationsCard
            key={ index }
            recomendation={ recomendation }
            index={ index }
          />
        ))}
      </div>
    </section>
  );
}

DrinkRecipeDetailsCard.propTypes = {}.isRequired;

export default DrinkRecipeDetailsCard;
