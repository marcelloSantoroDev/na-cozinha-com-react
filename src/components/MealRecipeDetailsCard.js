import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkToDrinkRecomendations } from '../redux/actions';
import DrinkRecomendationCard from './DrinkRecomendationCard';
import './css/Recomendations.css';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

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
  const SIX = 6;

  //   [{
  //     id: id-da-receita,
  //     type: meal-ou-drink, // hardcoded
  //     nationality: nacionalidade-da-receita-ou-texto-vazio, //hard
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita
  // }]

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

  const handleClick = () => {
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
    <section>
      <div className="meal-details-container">
        <div className="share-button-container">
          <button type="button" data-testid="share-btn">Share</button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleClick }
            src={ isThisMealFavorited ? blackHeart : whiteHeart }
          >
            Favorite
            <img
              src={ isThisMealFavorited ? blackHeart : whiteHeart }
              alt="unfavorited meal"
              width="12px"
            />
          </button>
        </div>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h4 data-testid="recipe-category">{`Category: ${strCategory}`}</h4>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
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
        <iframe
          data-testid="video"
          title={ strMeal }
          src={ `https://www.youtube.com/embed/${embedId}` }
          frameBorder="0"
        />

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
