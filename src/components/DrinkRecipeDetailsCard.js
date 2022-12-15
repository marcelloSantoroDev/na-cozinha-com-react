import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { thunkToMealRecomendations } from '../redux/actions';
import MealRecomendationsCard from './MealRecomendationsCard';
import './css/Recomendations.css';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkRecipeDetailsCard(props) {
  const { details } = props;
  const { strDrink,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
    strCategory,
    idDrink,
  } = details;
  const dispatch = useDispatch();
  const recomendations = useSelector((state) => state.getRecipesReducer.recomendations);
  const [isThisDrinkFavorited, setIsThisDrinkFavorited] = useState(false);
  const [isThisDrinkShared, setIsThisDrinkShared] = useState(false);
  const SIX = 6;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (favoriteRecipes !== null) {
      const findFavoriteDrink = favoriteRecipes.some((drink) => drink.id === idDrink);
      setIsThisDrinkFavorited(findFavoriteDrink);
    }
  }, [idDrink]);

  useEffect(() => {
    dispatch(thunkToMealRecomendations());
  }, [dispatch]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findFavoriteDrink = favoriteRecipes.some((drink) => drink.id === idDrink);
    if (findFavoriteDrink) {
      const filteredFavorites = favoriteRecipes.filter((recipe) => recipe.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
      setIsThisDrinkFavorited(false);
    } else {
      const favoriteObject = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      favoriteRecipes.push(favoriteObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsThisDrinkFavorited(true);
    }
  };

  const handleShareClick = () => {
    copy(window.location.href);
    setIsThisDrinkShared(true);
  };

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

  const arrayToMap = filteredIngredients
    .map((ingredient, i) => `${filteredMeasures[i]} of ${ingredient} `);
  return (
    <section>
      <div className="drink-details-container">
        <div className="share-button-container">
          <button
            type="button"
            data-testid="share-btn"
            src={ shareIcon }
            onClick={ handleShareClick }
          >
            Share
            <img src={ shareIcon } alt="share-icon" width="12px" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavoriteClick }
            src={ isThisDrinkFavorited ? blackHeart : whiteHeart }
          >
            Favorite
            <img
              src={ isThisDrinkFavorited ? blackHeart : whiteHeart }
              alt="unfavorited drink"
              width="12px"
            />
          </button>
        </div>
        { isThisDrinkShared && <p>Link copied!</p> }
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
