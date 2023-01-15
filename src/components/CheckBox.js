import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentSteps } from '../redux/actions';
import './css/InProgress.css';

function CheckBox(props) {
  const { e, index, type, id } = props;
  const [isThisStepChecked, setIsThisStepChecked] = useState(false);
  const dispatch = useDispatch();

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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'drink' && inProgressRecipes !== null) {
      const ids = Object.keys(inProgressRecipes.drinks);
      if (ids.some((el) => el === id)) {
        const recipe = inProgressRecipes.drinks[id];
        dispatch(getCurrentSteps(recipe.length));
        if (recipe.includes(index)) {
          setIsThisStepChecked(true);
        }
      } else {
        inProgressRecipes.drinks[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.drinks[id].length));
      }
    }
  }, [id, type, index, dispatch]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'meal' && inProgressRecipes !== null) {
      const ids = Object.keys(inProgressRecipes.meals);
      if (ids.some((el) => el === id)) {
        const recipe = inProgressRecipes.meals[id];
        dispatch(getCurrentSteps(recipe.length));
        if (recipe.includes(index)) {
          setIsThisStepChecked(true);
        }
      } else {
        inProgressRecipes.meals[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.meals[id].length));
      }
    }
  }, [id, index, type, dispatch]);

  const handleCheckClick = ({ target: { checked } }) => {
    setIsThisStepChecked(checked);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (type === 'meal' && inProgressRecipes !== null) {
      const itIncludesIndex = inProgressRecipes.meals[id].includes(index);
      if (itIncludesIndex) {
        const filteredIndex = inProgressRecipes.meals[id]
          .filter((stepIndex) => stepIndex !== index);
        inProgressRecipes.meals[id] = filteredIndex;
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.meals[id].length));
      } else {
        inProgressRecipes.meals[id].push(index);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.meals[id].length));
      }
    }
    if (type === 'drink' && inProgressRecipes !== null) {
      const itIncludesIndex = inProgressRecipes.drinks[id].includes(index);
      if (itIncludesIndex) {
        const filteredIndex = inProgressRecipes.meals[id]
          .filter((stepIndex) => stepIndex !== index);
        inProgressRecipes.drinks[id] = filteredIndex;
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.drinks[id].length));
      } else {
        inProgressRecipes.drinks[id].push(index);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        dispatch(getCurrentSteps(inProgressRecipes.drinks[id].length));
      }
    }
  };

  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      className="ingredient-list"
    >
      <label
        className={ isThisStepChecked ? 'Checked' : undefined }
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ `${index}-ingredient-step` }

      >
        <input
          type="checkbox"
          value={ index }
          name={ `${index}-ingredient-step` }
          onChange={ handleCheckClick }
          checked={ isThisStepChecked }
        />
        {e}

      </label>
    </li>
  );
}

CheckBox.propTypes = {}.isRequired;

export default CheckBox;
