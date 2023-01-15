import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteheart.png';
import blackHeart from '../images/blackheart.png';
import shareIcon from '../images/share.png';
import CheckBox from './CheckBox';
import './css/InProgress.css';

function DrinkInProgress(props) {
  const { details } = props;
  const history = useHistory();
  const { strDrink,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
    strCategory,
    idDrink,
    strTags,
  } = details;
  const [isThisDrinkFavorited, setIsThisDrinkFavorited] = useState(false);
  const [isThisDrinkShared, setIsThisDrinkShared] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState(0);
  const count = useSelector((state) => state.getCurrentStepsReducer.count);

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
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setCheckedSteps(count);
  }, [count]);

  const handleTags = () => {
    if (strTags === null) {
      return [];
    }
    return strTags.split(',');
  };

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
    const url = window.location.href.split('/in-progress')[0];
    copy(url);
    setIsThisDrinkShared(true);
  };

  const handleFinishClick = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const findDoneRecipe = doneRecipes.some((drink) => drink.id === idDrink);
    if (findDoneRecipe) {
      history.push('/done-recipes');
    } else {
      const doneObject = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: new Date(),
        tags: handleTags(),
      };
      doneRecipes.push(doneObject);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      history.push('/done-recipes');
    }
  };

  const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,
    strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10,
    strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15,
  } = details;

  const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
    strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11,
    strMeasure12, strMeasure13, strMeasure14, strMeasure15 } = details;

  const measureArray = [strMeasure1, strMeasure2, strMeasure3, strMeasure4,
    strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10,
    strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15];

  const ingredientsArray = [strIngredient1, strIngredient2, strIngredient3,
    strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8,
    strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13,
    strIngredient14, strIngredient15];

  const filteredIngredients = ingredientsArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const filteredMeasures = measureArray
    .filter((e) => e !== '' && e !== null && e !== false && e !== ' ');

  const arrayToMap = filteredIngredients
    .map((ingredient, i) => `${filteredMeasures[i]} of ${ingredient} `);

  return (
    <section>
      <div className="drink-progress-container">
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
            src={ isThisDrinkFavorited ? blackHeart : whiteHeart }
            className="details-btn"
          >
            <img
              src={ isThisDrinkFavorited ? blackHeart : whiteHeart }
              alt="unfavorited drink"
              width="40px"
            />
          </button>
        </div>
        { isThisDrinkShared && <p className="copied">Link copied!</p> }
        <h1 data-testid="recipe-title" className="recipe-title">{strDrink}</h1>
        <h5
          data-testid="recipe-category"
          className="recipe-category"
        >
          {`Category: ${strCategory}, ${strAlcoholic}`}

        </h5>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
          width="350px"
          className="recipe-photo"
        />
        <ul>
          { arrayToMap.map((e, index) => (
            <CheckBox
              e={ e }
              index={ index }
              key={ e + index }
              type="drink"
              id={ idDrink }
            />
          )) }
        </ul>
        <h4>Instructions</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="finish-button-container">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="finish-button"
          disabled={ arrayToMap.length !== checkedSteps }
          onClick={ handleFinishClick }
        >
          Finish Recipe
        </button>
      </div>
    </section>
  );
}

DrinkInProgress.propTypes = {}.isRequired;

export default DrinkInProgress;
