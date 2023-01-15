import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkwhite.png';
import mealIcon from '../images/mealwhite.png';
import './css/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="meal icon" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
