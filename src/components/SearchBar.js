import React, { Component } from 'react';
import { ingredientFetch, nameFetch, firstLetterFetch } from '../services/SearchBarFetch';

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

  handleSearchClick = async () => {
    const { radioValue, inputValue } = this.state;
    if (radioValue === 'Ingredient') {
      const ingredients = await ingredientFetch(inputValue);
      this.setState({ APIresponse: ingredients });
    }
    if (radioValue === 'Name') {
      const names = await nameFetch(inputValue);
      this.setState({ APIresponse: names });
    }
    if (radioValue === 'First Letter') {
      const firstLetters = await firstLetterFetch(inputValue);
      this.setState({ APIresponse: firstLetters });
    }
  };

  render() {
    const { inputValue, APIresponse } = this.state;
    console.log(APIresponse);
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          name="inputValue"
          value={ inputValue }
          onChange={ this.handleChange }
        />
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
        <button
          onClick={ this.handleSearchClick }
          data-testid="exec-search-btn"
          type="button"
        >
          Search

        </button>
      </div>
    );
  }
}

export default SearchBar;
