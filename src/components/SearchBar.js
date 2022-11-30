import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
        />
        <label htmlFor="Ingredient">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="radioValue"
            id="Ingredient"
          />
        </label>
        <label htmlFor="Name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="radioValue"
            id="Name"
          />
        </label>
        <label htmlFor="First Letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="radioValue"
            id="First Letter"
          />
        </label>
        <button
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
