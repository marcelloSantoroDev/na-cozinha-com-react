import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { thunkToDrinkRecomendations } from '../redux/actions';
import DrinkRecomendationCard from './DrinkRecomendationCard';
import './css/Recomendations.css';
import whiteHeart from '../images/whiteheart.png';
import blackHeart from '../images/blackheart.png';
import shareIcon from '../images/share.png';
import '../pages/css/RecipeDetails.css';

function MealRecipeDetailsCard(props) {
  const { details } = props;
  const { strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube,
    idMeal,
    strArea,
  } = details;
  const embedId = strYoutube.split('=')[1];
  const dispatch = useDispatch();
  const recomendations = useSelector((state) => state.getRecipesReducer.recomendations);
  const [isThisMealFavorited, setIsThisMealFavorited] = useState(false);
  const [isThisMealShared, setIsThisMealShared] = useState(false);
  const SIX = 6;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (favoriteRecipes !== null) {
      const findFavoriteMeal = favoriteRecipes.some((meal) => meal.id === idMeal);
      setIsThisMealFavorited(findFavoriteMeal);
    }
  }, [idMeal]);

  useEffect(() => {
    dispatch(thunkToDrinkRecomendations());
  }, [dispatch]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const findFavoriteMeal = favoriteRecipes.some((meal) => meal.id === idMeal);
    if (findFavoriteMeal) {
      const filteredFavorites = favoriteRecipes.filter((recipe) => recipe.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
      setIsThisMealFavorited(false);
    } else {
      const favoriteObject = {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      favoriteRecipes.push(favoriteObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsThisMealFavorited(true);
    }
  };

  const handleShareClick = () => {
    copy(window.location.href);
    setIsThisMealShared(true);
  };

  const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,
    strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10,
    strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15,
    strIngredient16, strIngredient17, strIngredient18, strIngredient19,
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

  const arrayToMap = filteredIngredients
    .map((ingredient, i) => `${filteredMeasures[i]} of ${ingredient} `);

  return (
    <section>
      <div className="meal-details-container">
        <div className="share-button-container">
          <button
            type="button"
            data-testid="share-btn"
            src={ shareIcon }
            onClick={ handleShareClick }
            className="details-btn"
          >
            <img src={ shareIcon } alt="share-icon" width="40px" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavoriteClick }
            src={ isThisMealFavorited ? blackHeart : whiteHeart }
            className="details-btn"
          >
            <img
              src={ isThisMealFavorited ? blackHeart : whiteHeart }
              alt="unfavorited meal"
              width="40px"
            />
          </button>
        </div>
        { isThisMealShared && <p className="copied">Link copied!</p> }
        <div className="rcp-container">
          <h1 data-testid="recipe-title" className="recipe-title">{strMeal}</h1>
          <h5
            data-testid="recipe-category"
            className="recipe-category"
          >
            {`${strCategory}`}

          </h5>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMeal }
            width="350px"
            className="recipe-photo"
          />
          <ul>
            { arrayToMap.map((e, index) => (
              <li
                className="ingredient-list"
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e + index }
              >
                {e}

              </li>
            )) }
          </ul>
          <h4 className="instructions">Instructions</h4>
          <p data-testid="instructions" className="instructions">{strInstructions}</p>
          <iframe
            data-testid="video"
            title={ strMeal }
            src={ `https://www.youtube.com/embed/${embedId}` }
            frameBorder="0"
          />
        </div>

      </div>
      <div className="recomendations-container">
        {recomendations.filter((_e, i) => i < SIX).map((recomendation, index) => (
          <DrinkRecomendationCard
            data-testid={ `${index}-recommendation-card` }
            key={ index }
            recomendation={ recomendation }
            index={ index }
          />
        ))}
      </div>
    </section>

  );
}

MealRecipeDetailsCard.propTypes = {}.isRequired;

export default MealRecipeDetailsCard;
