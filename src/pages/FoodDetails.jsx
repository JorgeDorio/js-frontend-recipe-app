import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { getApiCallback } from '../helpers/index';
import ApiContext from '../context/ApiContext';
import { getMealsApiId } from '../services/getApi';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './styles/FoodDetailsStyle.css';

function FoodDetails() {
  const [isFilled, setIsFilled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [showMsg, setShoeMsg] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { drinks } = useContext(ApiContext);
  const { id } = useParams();
  const [myMeal, setMyMeal] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const arrayLength = 6;
  const history = useHistory();
  const toggleFill = () => {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strArea,
    } = myMeal[0];
    const recipe = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (isFilled) {
      setIsFilled(false);
      setIsFavorite(whiteHeartIcon);
    } else {
      const localStorageArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || '';
      const currentArray = [...localStorageArray];
      currentArray.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(currentArray));
      setIsFilled(true);
      setIsFavorite(blackHeartIcon);
    }
  };

  const verifyFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const getFavorite = favoriteRecipes
      ? favoriteRecipes.filter((recipe) => recipe.id === id)
      : [];
    if (getFavorite.length) {
      setIsFavorite(blackHeartIcon);
      setIsFilled(true);
    }
  };

  useEffect(() => {
    verifyFavorite();
  }, []);

  const verifyProgress = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')).meals
      : [];
    const isInProgress = Object.keys(inProgressRecipes).filter(
      (recipe) => recipe === id,
    );
    if (isInProgress.length) {
      setInProgress(true);
    }
  };

  const verifyDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDone = doneRecipes
      ? doneRecipes.filter((recipe) => recipe.id === id)
      : [];
    if (filterDone.length || inProgress) {
      setIsDone(true);
    }
  };

  useEffect(() => {
    verifyProgress();
    verifyDone();
  });

  useEffect(() => {
    getApiCallback(id, getMealsApiId, setMyMeal);
  }, [id]);

  useEffect(() => {
    const keys = Object.entries(myMeal[0]);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [myMeal]);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = myMeal[0];

  const sendRecipeToStorage = (recipeId, element) => {
    const getStoredRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const meals = { [recipeId]: element };
    const currentRecipe = {
      ...getStoredRecipe,
      meals: { ...getStoredRecipe.meals, ...meals },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
    history.push(`/foods/${myMeal[0].idMeal}/in-progress`);
  };

  return (
    <div className="details-container">

      <img
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <div className="title-details">
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            setShoeMsg(true);
            navigator.clipboard.writeText(window.location.href);
          } }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {showMsg && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ toggleFill }
          src={ isFavorite }
        >
          <img src={ isFavorite } alt="favorite" />
        </button>
      </div>
      <div className="title-details-2">
        <h3 data-testid="recipe-category">{strCategory}</h3>
      </div>
      {ingredients.map((ingred, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingred} - ${measure[i]}`}
        </p>
      ))}
      <div className="instructions-content">
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="video-content">
        <iframe
          data-testid="video"
          src={ strYoutube?.replace('watch?', 'embed/') }
          title="Embedded youtube"
        />
      </div>
      <div>
        <h1>Recomendation</h1>
      </div>
      <section className="recomendation-content">
        {drinks.slice(0, arrayLength).map((each, i) => {
          if (i > 1) {
            return (
              <div key={ i } data-testid={ `${i}-recomendation-card` } hidden>
                <img
                  src={ each.strDrinkThumb }
                  width="100px"
                  alt="recommendation"
                />
                <div data-testid={ `${i}-recomendation-title` }>
                  {each.strDrink}
                </div>
              </div>
            );
          }
          return (
            <div key={ i } data-testid={ `${i}-recomendation-card` }>
              <img
                src={ each.strDrinkThumb }
                width="100px"
                alt="recommendation"
              />
              <p data-testid={ `${i}-recomendation-title` }>
                {each.strDrink}
              </p>
            </div>
          );
        })}
      </section>
      <section>
        {inProgress && (
          <button
            type="button"
            className="fixed-bottom bottom-button"
            data-testid="start-recipe-btn"
            onClick={ () => history
              .push(`/foods/${myMeal[0].idMeal}/in-progress`) }
          >
            Continue Recipe
          </button>
        )}
        {!isDone && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="fixed-bottom bottom-button"
            onClick={ () => sendRecipeToStorage(id, ingredients) }
          >
            Start Recipe
          </button>
        )}
      </section>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodDetails;
