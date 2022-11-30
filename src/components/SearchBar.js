import React, { Component } from 'react';
import { ingredientFetch,
  nameFetch,
  firstLetterFetch,
  drinkIngredientFetch,
  drinkNameFetch,
  drinkFirstLetterFetch,
} from '../services/SearchBarFetch';

const firstLetterString = 'First Letter';

class SearchBar extends Component {
  state = {
    radioValue: '',
    inputValue: '',
    APIresponse: [],
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleMealsSearchClick = async () => {
    const { radioValue, inputValue } = this.state;

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      const ingredients = await ingredientFetch(inputValue);
      this.setState({ APIresponse: ingredients });
    }
    if (radioValue === 'Name') {
      const names = await nameFetch(inputValue);
      this.setState({ APIresponse: names });
    }
    if (radioValue === firstLetterString) {
      const firstLetters = await firstLetterFetch(inputValue);
      this.setState({ APIresponse: firstLetters });
    }
  };

  handleDrinksSearchClick = async () => {
    const { radioValue, inputValue } = this.state;

    if (radioValue === firstLetterString && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radioValue === 'Ingredient') {
      const ingredients = await drinkIngredientFetch(inputValue);
      this.setState({ APIresponse: ingredients });
    }
    if (radioValue === 'Name') {
      const names = await drinkNameFetch(inputValue);
      this.setState({ APIresponse: names });
    }
    if (radioValue === firstLetterString) {
      const firstLetters = await drinkFirstLetterFetch(inputValue);
      this.setState({ APIresponse: firstLetters });
    }
  };

  render() {
    const { inputValue, APIresponse } = this.state;
    const { title } = this.props;
    console.log(APIresponse);
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

export default SearchBar;
