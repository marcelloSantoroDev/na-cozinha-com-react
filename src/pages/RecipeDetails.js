import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { thunkToDrinkDetails, thunkToMealDetails } from '../redux/actions';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  console.log(id);
  console.log(pathname);

  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      dispatch(thunkToMealDetails(id));
    } else {
      dispatch(thunkToDrinkDetails(id));
    }
  }, [dispatch, id, pathname]);

  return (
    <div>RecipeDetails</div>
  );
}

export default RecipeDetails;
