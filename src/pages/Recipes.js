import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { thunkToRenderDrinksRecipes, thunkToRenderMealsRecipes } from '../redux/actions';

function Recipes() {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.getRecipesReducer.recipes);
  const TWELVE = 12;

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/meals') {
      dispatch(thunkToRenderMealsRecipes());
    } else {
      dispatch(thunkToRenderDrinksRecipes());
    }
  }, [dispatch, location]);

  return (
    <>
      <Header
        showSearch
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <section className="card-container">
        { recipes !== null
            && recipes?.filter((_e, i) => i < TWELVE).map((recipe, index) => (
              <RecipeCard
                key={ location.pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
                index={ index }
                recipe={ recipe }
              />
            ))}
      </section>
      <Footer />
    </>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
