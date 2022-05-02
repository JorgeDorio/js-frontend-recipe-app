import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { getApiCallback } from '../helpers/index';
import ApiContext from '../context/ApiContext';
import { getMealsApiId } from '../services/getApi';

function FoodDetails() {
  const { drinks } = useContext(ApiContext);
  const { id } = useParams();
  const [myMeal, setMyMeal] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const arrayLength = 6;
  const history = useHistory();

  useEffect(() => {
    getApiCallback(id, getMealsApiId, setMyMeal);
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
      <iframe
        data-testid="video"
        width="240"
        height="135"
        src={ strYoutube?.replace('watch?', 'embed/') }
        title="Embedded youtube"
      />
      <div>
        <h1>Recomendation</h1>
      </div>
      <section
        max-height="300px"
      >
        {
          drinks
            .slice(0, arrayLength)
            .map((each, i) => {
              if (i > 1) {
                return (
                  <div
                    key={ i }
                    data-testid={ `${i}-recomendation-card` }
                    hidden
                  >
                    <img
                      src={ each.strDrinkThumb }
                      width="100px"
                      alt="recommendation"
                    />
                    <div
                      data-testid={ `${i}-recomendation-title` }
                    >
                      { each.strDrink }
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img
                    src={ each.strDrinkThumb }
                    width="100px"
                    alt="recommendation"
                  />
                  <div
                    data-testid={ `${i}-recomendation-title` }
                  >
                    { each.strDrink }
                  </div>
                </div>
              );
            })
        }
      </section>
      <section>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="fixed-bottom"
          onClick={ () => history
            .push(`/foods/${myMeal[0].idMeal}/in-progress`) }
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
