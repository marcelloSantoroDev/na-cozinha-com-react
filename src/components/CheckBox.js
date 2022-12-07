import React, { useState, useEffect } from 'react';
import './css/InProgress.css';

function CheckBox(props) {
  const { e, index, type, id } = props;
  const [isThisStepChecked, setIsThisStepChecked] = useState(false);

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (!inProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ drinks: {}, meals: {} }),
      );
    }
  }, []);

  useEffect(() => {

  }, []);

  const handleCheckClick = ({ target: { checked } }) => {
    setIsThisStepChecked(checked);
  };

  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      <label
        className={ isThisStepChecked && 'Checked' }
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ `${index}-ingredient-step` }

      >
        <input
          type="checkbox"
          value={ index }
          name={ `${index}-ingredient-step` }
          onClick={ handleCheckClick }
        />
        {e}

      </label>
    </li>
  );
}

CheckBox.propTypes = {}.isRequired;

export default CheckBox;
