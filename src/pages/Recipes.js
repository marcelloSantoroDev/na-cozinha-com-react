import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { thunkToRenderDrinksRecipes,
  thunkToRenderMealsRecipes,
  thunkToRenderMealsCategories,
  thunkToRenderDrinksCategories,
  thunkToFilterMealsCategories,
  thunkToFilterDrinksCategories,
} from '../redux/actions';
import './css/Recipes.css';

function Recipes() {
  const location = useLocation();
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.getRecipesReducer.recipes);
  const categories = useSelector((state) => state.getRecipesReducer.categories);

  const [categoryButton, setCategoryButton] = useState({
    categorySelected: '',
    isAnyCategorySelected: false,
    toggleFilter: false,
  });

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

  useEffect(() => {
    const { pathname } = location;
    const { categorySelected, isAnyCategorySelected, toggleFilter } = categoryButton;
    if (pathname === '/meals' && isAnyCategorySelected) {
      if (categorySelected === 'All' || toggleFilter) {
        dispatch(thunkToRenderMealsRecipes());
      } else {
        dispatch(thunkToFilterMealsCategories(categorySelected));
      }
    } else if (pathname === '/drinks' && isAnyCategorySelected) {
      if (categorySelected === 'All' || toggleFilter) {
        dispatch(thunkToRenderDrinksRecipes());
      } else {
        dispatch(thunkToFilterDrinksCategories(categorySelected));
      }
    }
  }, [categoryButton, location, dispatch]);

  const handleClick = ({ target }) => {
    const { name, value } = target;
    const { categorySelected } = categoryButton;
    setCategoryButton({
      [name]: value,
      isAnyCategorySelected: true,
      toggleFilter: categorySelected === value,
    });
  };

  return (
    <>
      <Header
        showSearch
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <section className="categories-container">
        <button
          onClick={ handleClick }
          name="categorySelected"
          value="All"
          data-testid="All-category-filter"
          type="button"
        >
          All

        </button>
        { categories
          .filter((_e, i) => i < FIVE)
          .map((category) => (
            <button
              name="categorySelected"
              value={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              type="button"
              onClick={ handleClick }
            >
              {category.strCategory}
            </button>
          )) }
      </section>
      <section className="cards-container">
        { recipes !== null
            && recipes?.filter((_e, i) => i < TWELVE).map((recipe, index) => (
              <RecipeCard
                key={ location.pathname === '/meals'
                  ? `${recipe.idMeal}-${index}` : `${recipe.idDrink}-${index}` }
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
