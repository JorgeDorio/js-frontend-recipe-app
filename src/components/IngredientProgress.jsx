import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsApiId } from '../services/getApi';
import './Styles/inProgress.css';

function IngredientProgress() {
  const [recipe, setRecipe] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkboxListStatus, setCheckboxListStatus] = useState([]);
  const { id } = useParams();
  const [btnStatus, setBtnStatus] = useState(true);

  const getFromApiID = async () => {
    const details = await getMealsApiId(id);
    setRecipe(details);
  };

  useEffect(() => {
    getFromApiID();
  }, []);

  useEffect(() => {
    const keys = Object.entries(recipe[0]);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [recipe]);

  useEffect(() => {
    const arrayLength = ingredients;
    const array = [];
    arrayLength.forEach(() => array.push(false));
    setCheckboxListStatus([...array]);
  }, [ingredients]);

  const handleCheckbox = (index, target) => {
    const checkArray = checkboxListStatus;
    checkArray[index] = !checkArray[index];
    setCheckboxListStatus([...checkArray]);
    if (checkboxListStatus.every((e) => e === true)) {
      setBtnStatus(false);
    } else {
      console.log(target.parentNode);
      setBtnStatus(true);
    }
  };

  return (
    <>
      {ingredients.map((ingred, i) => (
        <div
          key={ i }
        >
          <label
            htmlFor={ ingred }
            className={
              (checkboxListStatus[i] ? 'checked' : 'notChecked')
            }
          >
            <input
              data-testid={ `${i}-ingredient-step` }
              id={ ingred }
              type="checkbox"
              value={ `${ingred} - ${measure[i]}` }
              onChange={ ({ currentTarget }) => handleCheckbox(i, currentTarget) }
            />
            {`${ingred} - ${measure[i]}`}
          </label>
        </div>
      ))}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnStatus }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default IngredientProgress;
