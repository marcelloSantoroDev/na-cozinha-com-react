import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './css/Footer.css';

class Footer extends Component {
  render() {
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
}

export default connect()(Footer);
