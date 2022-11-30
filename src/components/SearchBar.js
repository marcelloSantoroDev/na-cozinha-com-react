import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ingredientFetch,
  nameFetch,
  firstLetterFetch,
  drinkIngredientFetch,
  drinkNameFetch,
  drinkFirstLetterFetch,
} from '../services/SearchBarFetch';
import { getRecipes } from '../redux/actions';

const firstLetterString = 'First Letter';

class SearchBar extends Component {
  state = {
    radioValue: '',
    inputValue: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleMealsSearchClick = async () => {
    const { radioValue, inputValue } = this.state;
    const { dispatch } = this.props;

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      const ingredients = await ingredientFetch(inputValue);
      dispatch(getRecipes(ingredients));
    }
    if (radioValue === 'Name') {
      const names = await nameFetch(inputValue);
      dispatch(getRecipes(names));
    }
    if (radioValue === firstLetterString) {
      const firstLetter = await firstLetterFetch(inputValue);
      dispatch(getRecipes(firstLetter));
    }
  };

  handleDrinksSearchClick = async () => {
    const { radioValue, inputValue } = this.state;
    const { dispatch } = this.props;

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      const ingredients = await drinkIngredientFetch(inputValue);
      dispatch(getRecipes(ingredients));
    }
    if (radioValue === 'Name') {
      const names = await drinkNameFetch(inputValue);
      dispatch(getRecipes(names));
    }
    if (radioValue === firstLetterString) {
      const firstLetter = await drinkFirstLetterFetch(inputValue);
      dispatch(getRecipes(firstLetter));
    }
  };

  render() {
    const { inputValue } = this.state;
    const { title } = this.props;
    return (
      <section>
        <div className="search-container">
          <input
            type="text"
            data-testid="search-input"
            name="inputValue"
            value={ inputValue }
            onChange={ this.handleChange }
          />
          <button
            onClick={ title === 'Meals'
              ? this.handleMealsSearchClick : this.handleDrinksSearchClick }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </section>
    );
  }
}

SearchBar.propTypes = {}.isRequired;

export default connect()(SearchBar);
