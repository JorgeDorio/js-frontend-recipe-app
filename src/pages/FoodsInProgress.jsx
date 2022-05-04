import React from 'react';
import IngredientProgress from '../components/IngredientProgress';
// import { useHistory } from 'react-router-dom';

function FoodsInProgress() {
  return (
    <>
      {/* <img
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>

      <h3 data-testid="recipe-category">{strCategory}</h3>

      <p data-testid="instructions">{strInstructions}</p> */}
      <IngredientProgress />
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default FoodsInProgress;
