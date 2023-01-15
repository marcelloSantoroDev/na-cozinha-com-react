import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Header.css';
import SearchBar from './SearchBar';

function Header(props) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { pathname } = useLocation();

  const handleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const { showSearch, title } = props;
  return (
    <header>
      <div className="main-header">
        <h1 data-testid="page-title" className="page-title">
          { title }
        </h1>
        { pathname !== '/profile' && (
          <Link
            to="/profile"
            className="profile-button"
          >
            <h1 className="page-title">Profile</h1>
          </Link>)}
        { showSearch && (
          <button className="searchBarButton" type="button" onClick={ handleSearchInput }>
            <h1 className="page-title">Search</h1>
          </button>)}
      </div>
      {showSearchInput && <SearchBar title={ title } />}
    </header>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
