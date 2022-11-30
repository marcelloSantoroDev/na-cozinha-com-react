import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
  render() {
    const { thumb, recipeName, id, pathname, index } = this.props;
    return (
      <Link
        to={ `${pathname}/${id}` }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ thumb }
          alt={ `${recipeName} img` }
          width="300px"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>
          {recipeName}
        </span>
      </Link>
    );
  }
}

RecipeCard.propTypes = {}.isRequired;
export default RecipeCard;
