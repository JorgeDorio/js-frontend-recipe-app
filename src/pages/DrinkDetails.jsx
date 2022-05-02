import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { getApiCallback } from '../helpers/index';
import { getDrinksApiId } from '../services/getApi';
import ApiContext from '../context/ApiContext';

// const mockInProgressRecipes = {
//   cocktails: {
//     178319: [],
//   },
// };
// localStorage.setItem(
//   'inProgressRecipes',
//   JSON.stringify(mockInProgressRecipes),
// );

// const inProgressRecipes = JSON.parse(
//   localStorage.getItem('inProgressRecipes'),
// ).cocktails;
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DrinkDetails() {
  // const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { id } = useParams();
  const [myDrink, setMyDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const { meals } = useContext(ApiContext);
  const arrayLength = 6;

  useEffect(() => {
    const filterDone = doneRecipes
      ? doneRecipes.filter((recipe) => recipe.id === id)
      : [];
    if (filterDone.length) {
      setIsDone(true);
    }
  }, []);

  useEffect(() => {
    getApiCallback(id, getDrinksApiId, setMyDrink);
  }, [id]);

  useEffect(() => {
    const keys = Object.entries(myDrink[0]);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [myDrink]);

  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = myDrink[0];

  return (
    <>
      <h1> Details </h1>
      <img
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button data-testid="share-btn" type="button">
        Share
      </button>
      <button data-testid="favorite-btn" type="button">
        Favorite
      </button>
      <h3 data-testid="recipe-category">{strAlcoholic}</h3>
      {ingredients.map((ingred, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingred} - ${measure[i]}`}
        </p>
      ))}
      <p data-testid="instructions">{strInstructions}</p>

      <div>
        <h1>Recomendation</h1>
        {meals.slice(0, arrayLength).map((each, i) => {
          if (i > 1) {
            return (
              <div key={ i } data-testid={ `${i}-recomendation-card` } hidden>
                <img
                  src={ each.strMealThumb }
                  width="100px"
                  alt="recommendation"
                />
                <div data-testid={ `${i}-recomendation-title` }>
                  {each.strMeal}
                </div>
              </div>
            );
          }
          return (
            <div key={ i } data-testid={ `${i}-recomendation-card` }>
              <img src={ each.strMealThumb } width="100px" alt="recommendation" />
              <div data-testid={ `${i}-recomendation-title` }>{each.strMeal}</div>
            </div>
          );
        })}
      </div>
      <section>
        {!isDone && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="fixed-bottom"
            onClick={ () => history.push(`/drinks/${myDrink[0].idDrink}/in-progress`) }
          >
            Start Recipe
          </button>
        )}
      </section>
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DrinkDetails;
