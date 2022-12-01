import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const { showSearch, title } = props;
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
        <button type="button" onClick={ handleSearchInput }>
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

Header.propTypes = {}.isRequired;

export default Header;
