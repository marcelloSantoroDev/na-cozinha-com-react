import React, { Component } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  render() {
    const { showSearch, title } = this.props;
    return (
      <header>
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
        { showSearch && <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />}
        <h1 data-testid="page-title">
          { title }
        </h1>
      </header>
    );
  }
}

Header.propTypes = {}.isRequired;

export default Header;
