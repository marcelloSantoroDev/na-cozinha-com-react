import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import DrinkRecipeDetailsCard from '../components/DrinkRecipeDetailsCard';
import MealRecipeDetailsCard from '../components/MealRecipeDetailsCard';
import { thunkToDrinkDetails, thunkToMealDetails } from '../redux/actions';
import './css/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipeDetails = useSelector((state) => state.getRecipesReducer.recipeDetails);
  const [recipeId, setRecipeId] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);

  console.log(recipeDetails);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes !== null) {
      setRecipeId(doneRecipes.id === id);
    }
  }, [id]);

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null && inProgressRecipes !== undefined) {
      setRecipeInProgress(inProgressRecipes.length > 0);
    }
  }, [id, pathname]);

  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      dispatch(thunkToMealDetails(id));
    } else {
      dispatch(thunkToDrinkDetails(id));
    }
  }, [dispatch, id, pathname]);

  const handleClick = () => {
    history.push(`${id}/in-progress`);
  };

  return (

    <section className="details-section">
      <div className="details-card-container">
        {recipeDetails.map((details) => (
          pathname === `/meals/${id}` ? <MealRecipeDetailsCard details={ details } />
            : <DrinkRecipeDetailsCard details={ details } />
        ))}
      </div>
      <div className="start-button-container">
        { !recipeId && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-button"
            onClick={ handleClick }
          >
            { !recipeInProgress ? 'Start Recipe' : 'Continue Recipe'}

          </button>)}
      </div>
    </section>
  );
}

export default RecipeDetails;
