import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { thunkToRenderDrinksRecipes,
  thunkToRenderMealsRecipes,
  thunkToRenderMealsCategories,
  thunkToRenderDrinksCategories,
} from '../redux/actions';
import './css/Recipes.css';

function Recipes() {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.getRecipesReducer.recipes);
  const categories = useSelector((state) => state.getRecipesReducer.categories);
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/meals') {
      dispatch(thunkToRenderMealsRecipes());
      dispatch(thunkToRenderMealsCategories());
    } else {
      dispatch(thunkToRenderDrinksRecipes());
      dispatch(thunkToRenderDrinksCategories());
    }
  }, [dispatch, location]);

  return (
    <>
      <Header
        showSearch
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <section className="categories-container">
        <button data-testid="All-category-filter" type="button">All</button>
        { categories
          .filter((_e, i) => i < FIVE)
          .map((category) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              type="button"
            >
              {category.strCategory}
            </button>
          )) }
      </section>
      <section className="cards-container">
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
