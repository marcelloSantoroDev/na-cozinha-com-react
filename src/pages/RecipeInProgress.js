import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import { thunkToDrinkDetails, thunkToMealDetails } from '../redux/actions';
import '../components/css/InProgress.css';

function RecipeInProgress() {
  const recipeDetails = useSelector((state) => state.getRecipesReducer.recipeDetails);
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    if (pathname === `/meals/${id}/in-progress`) {
      dispatch(thunkToMealDetails(id));
    } else {
      dispatch(thunkToDrinkDetails(id));
    }
  }, [dispatch, id, pathname]);

  return (
    <section className="progress-section">
      <div className="progress-card-container">
        {recipeDetails.map((details, i) => (
          pathname === `/meals/${id}/in-progress`
            ? <MealInProgress key={ `progress-meal-${i}` } details={ details } />
            : <DrinkInProgress key={ `progress-drink-${i}` } details={ details } />
        ))}
      </div>
    </section>
  );
}

export default RecipeInProgress;
