import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import CheckBox from './CheckBox';

function MealInProgress(props) {
  const { details } = props;
  const { strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    idMeal,
    strArea,
  } = details;
  const [isThisMealFavorited, setIsThisMealFavorited] = useState(false);
  const [isThisMealShared, setIsThisMealShared] = useState(false);
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
    const url = window.location.href.split('/in-progress')[0];
    copy(url);
    setIsThisMealShared(true);
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

  const arrayToMap = filteredIngredients
    .map((ingredient, i) => `${filteredMeasures[i]} of ${ingredient} `);

  return (
    <section>
      <div className="meal-progress-container">
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
        { isThisMealShared && <p>Link copied!</p> }
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
            <CheckBox
              e={ e }
              index={ index }
              key={ e + index }
              id={ idMeal }
              type="meal"
            />
          )) }
        </ul>
        <h4>Instructions</h4>
        <p data-testid="instructions">{strInstructions}</p>

      </div>
    </section>
  );
}

MealInProgress.propTypes = {}.isRequired;

export default MealInProgress;
