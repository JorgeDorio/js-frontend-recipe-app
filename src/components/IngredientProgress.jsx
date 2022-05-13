import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getMealsApiId, getDrinksApiId } from '../services/getApi';
import { getProgress, setDoneRecipe, setProgress } from '../storage';
import './Styles/inProgress.css';

function IngredientProgress() {
  const [recipe, setRecipe] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [checkboxListStatus, setCheckboxListStatus] = useState(getProgress());
  const { id } = useParams();
  const [btnStatus, setBtnStatus] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const getFromApiID = async () => {
    if (location.pathname === `/foods/${id}/in-progress`) {
      const foodDetails = await getMealsApiId(id);
      setRecipe(foodDetails);
    } else {
      const drinkDetails = await getDrinksApiId(id);
      setRecipe(drinkDetails);
    }
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
    setCheckboxListStatus(getProgress());
  }, [ingredients]);

  const handleCheckbox = (index) => {
    const checkArray = checkboxListStatus;
    checkArray[index] = !checkArray[index];
    setCheckboxListStatus([...checkArray]);
    setProgress([...checkArray]);
    if (checkboxListStatus.length === ingredients.length
      && checkboxListStatus.every((e) => e === true)) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  };

  const date = new Date().toLocaleDateString();

  const handleFinish = (currentRecipe) => {
    const doneRecipe = {
      alcoholicOrNot: !currentRecipe[0].strMeal ? recipe[0].strAlcoholic : '',
      category: recipe[0].strCategory,
      doneDate: date,
      id: !currentRecipe[0].strMeal ? recipe[0].idDrink : recipe[0].idMeal,
      image: !currentRecipe[0].strMeal
        ? recipe[0].strDrinkThumb : recipe[0].strMealThumb,
      name: !currentRecipe[0].strMeal ? recipe[0].strDrink : recipe[0].strMeal,
      nationality: !currentRecipe[0].strMeal ? '' : recipe[0].strArea,
      tags: !currentRecipe[0].strMeal
        ? [recipe[0].strTags] : [currentRecipe[0].strTags],
      type: !currentRecipe[0].strMeal ? 'drink' : 'food',
    };
    setDoneRecipe(doneRecipe);
    localStorage.removeItem('progress');
    history.push('/done-recipes');
  };

  return (
    <>
      {ingredients.map((ingred, i) => (
        <div
          key={ i }
          data-testid={ `${i}-ingredient-step` }
          className="container-ingredient-step"
        >
          <label
            htmlFor={ ingred }
            className={
              (checkboxListStatus[i] ? 'checked' : 'notChecked')
            }
          >
            <input
              id={ ingred }
              type="checkbox"
              checked={ checkboxListStatus[i] }
              value={ `${ingred} - ${measure[i]}` }
              onChange={ () => handleCheckbox(i) }
            />
            {`${ingred} - ${measure[i]}`}
          </label>
        </div>
      ))}
      <div className="container-button-finish-recipe">
        <button
          className="btn-finish-recipe"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ btnStatus }
          onClick={ () => handleFinish(recipe) }
        >
          Finish Recipe
        </button>
      </div>

    </>
  );
}

export default IngredientProgress;
