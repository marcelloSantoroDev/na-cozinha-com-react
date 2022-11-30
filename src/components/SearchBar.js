import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <input
        type="text"
        data-testid="search-input"
      />
    );
  }
}

export default SearchBar;
