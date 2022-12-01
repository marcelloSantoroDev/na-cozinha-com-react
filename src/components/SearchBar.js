import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ingredientFetch,
  nameFetch,
  firstLetterFetch,
  drinkIngredientFetch,
  drinkNameFetch,
  drinkFirstLetterFetch,
} from '../services/SearchBarFetch';
import { getRecipes } from '../redux/actions';

const firstLetterString = 'First Letter';

function SearchBar(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    radioValue: '',
    inputValue: '',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleMealsSearchClick = async () => {
    const { radioValue, inputValue } = inputs;

    let recipeToDispatch = [];

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      recipeToDispatch = await ingredientFetch(inputValue);
    }
    if (radioValue === 'Name') {
      recipeToDispatch = await nameFetch(inputValue);
    }
    if (radioValue === firstLetterString) {
      recipeToDispatch = await firstLetterFetch(inputValue);
    }
    if (recipeToDispatch === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipeToDispatch.length === 1) {
      const id = recipeToDispatch[0].idMeal;
      history.push(`/meals/${id}`);
    }
    dispatch(getRecipes(recipeToDispatch));
  };

  const handleDrinksSearchClick = async () => {
    const { radioValue, inputValue } = inputs;

    let recipeToDispatch = [];

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      recipeToDispatch = await drinkIngredientFetch(inputValue);
    }
    if (radioValue === 'Name') {
      recipeToDispatch = await drinkNameFetch(inputValue);
    }
    if (radioValue === firstLetterString) {
      recipeToDispatch = await drinkFirstLetterFetch(inputValue);
    }
    if (recipeToDispatch === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipeToDispatch.length === 1) {
      const id = recipeToDispatch[0].idDrink;
      history.push(`/drinks/${id}`);
    }
    dispatch(getRecipes(recipeToDispatch));
  };

  const { inputValue } = inputs;
  const { title } = props;
  return (
    <section>
      <div className="search-container">
        <input
          type="text"
          data-testid="search-input"
          name="inputValue"
          value={ inputValue }
          onChange={ handleChange }
        />
        <button
          onClick={ title === 'Meals'
            ? handleMealsSearchClick : handleDrinksSearchClick }
          data-testid="exec-search-btn"
          type="button"
        >
          Search

        </button>
      </div>
      <div className="radios-container">
        <label htmlFor="Ingredient">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="radioValue"
            value="Ingredient"
            id="Ingredient"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="Name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="radioValue"
            value="Name"
            id="Name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="First Letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="radioValue"
            value="First Letter"
            id="First Letter"
            onChange={ handleChange }
          />
        </label>
      </div>
    </section>
  );
}

SearchBar.propTypes = {}.isRequired;

export default SearchBar;
