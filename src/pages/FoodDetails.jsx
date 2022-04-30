import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { getApiFood } from '../helpers';
import { getMealsApiId } from '../services/getApi';

function FoodDetails() {
  const { id } = useParams();
  const [myMeal, setMyMeal] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    getApiFood(id, getMealsApiId, setMyMeal);
  }, [id]);

  useEffect(() => {
    const keys = Object.entries(myMeal[0]);
    const filterIngredients = keys.filter((i) => i[0].includes('strIngredient')
    && i[1]).map((i) => i[1]);
    const filterMeasure = keys.filter((i) => i[0].includes('strMeasure')
    && i[1]).map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [myMeal]);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = myMeal[0];
  console.log(strYoutube);

  return (
    <>
      <h1> Details </h1>
      <img
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h2
        data-testid="recipe-title"
      >
        {strMeal}
      </h2>
      <button
        data-testid="share-btn"
        type="button"
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorite
      </button>
      <h3
        data-testid="recipe-category"
      >
        {strCategory}
      </h3>
      { ingredients.map((ingred, i) => (
        <p
          key={ i }
          data-testid={ `${i}-ingredient-name-and-measure` }
        >
          {`${ingred} - ${measure[i]}`}
        </p>
      )) }
      <p
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      <a href={ strYoutube } target="video">
        <iframe
          data-testid="video"
          allow="encrypted-media; accelerometer"
          height="200"
          width="300"
          title={ strMeal }
          name="video"
        />
      </a>
      <div data-testid="0-recomendation-card">
        <h1>Recomendation</h1>
      </div>
      <section>
        <button
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </section>
    </>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodDetails;
