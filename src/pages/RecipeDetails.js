import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import DrinkRecipeDetailsCard from '../components/DrinkRecipeDetailsCard';
import MealRecipeDetailsCard from '../components/MealRecipeDetailsCard';
import { thunkToDrinkDetails, thunkToMealDetails } from '../redux/actions';
import './css/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.getRecipesReducer.recipeDetails);

  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      dispatch(thunkToMealDetails(id));
    } else {
      dispatch(thunkToDrinkDetails(id));
    }
  }, [dispatch, id, pathname]);

  return (

    <section className="details-section">
      <div className="details-card-container">
        {recipeDetails.map((details) => (
          pathname === `/meals/${id}` ? <MealRecipeDetailsCard details={ details } />
            : <DrinkRecipeDetailsCard details={ details } />
        ))}
      </div>
      <div className="button-container">
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-button"
        >
          Start Recipe

        </button>
      </div>
    </section>
  );
}

export default RecipeDetails;
