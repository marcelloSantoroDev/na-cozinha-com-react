import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  state = {
    showSearchInput: false,
  };

  handleSearchInput = () => {
    this.setState((prev) => ({ showSearchInput: prev.showSearchInput === false }));
  };

  render() {
    const { showSearch, title } = this.props;
    const { showSearchInput } = this.state;
    return (
      <header>
        <Link
          to="/profile"
        >
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        { showSearch && (
          <button type="button" onClick={ this.handleSearchInput }>
            <img
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
          </button>)}
        <h1 data-testid="page-title">
          { title }
        </h1>
        {showSearchInput && <SearchBar title={ title } />}
      </header>
    );
  }
}

Header.propTypes = {}.isRequired;

export default connect()(Header);
