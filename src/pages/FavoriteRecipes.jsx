import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import { getFavoriteRecipe } from '../storage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipe, setFavoriteRecipe] = useState(getFavoriteRecipe());
  const [showMsg, setShoeMsg] = useState(false);

  const handleUnfavorite = (id) => {
    const newFavorite = favoriteRecipe.filter((recipe) => id !== recipe.id);
    setFavoriteRecipe(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  const handleDrink = () => {
    const drinkRecipes = favoriteRecipe.filter((recipe) => recipe.type === 'drink');
    setFavoriteRecipe(drinkRecipes);
  };

  const handleFood = () => {
    const foodRecipes = favoriteRecipe.filter((recipe) => recipe.type === 'food');
    setFavoriteRecipe(foodRecipes);
  };

  const handleAll = () => {
    const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipe(allRecipes);
  };

  return (
    <>
      <HeaderNoSearch />
      <div
        height="500px"
        className="border border-primary"
      >
        className
      </div>
      <div
        width="30px"
        height="500px"
        className="d-flex
        justify-content-around
        d-flex align-items-center
        mb-0
        border border-primary
        "
      >
        <button
          className="btn btn-success"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleAll() }
        >
          All
        </button>
        <button
          className="btn btn-success"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFood() }
        >
          Food
        </button>
        <button
          className="btn btn-success"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleDrink() }
        >
          Drink
        </button>
      </div>
      { favoriteRecipe && favoriteRecipe.map((each, i) => (
        each.type === 'food'
          ? (
            <div
              className="card"
              key={ i }
            >
              <Link
                to={ `/foods/${each.id}` }
                className="card-body"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  alt={ each.name }
                  src={ each.image }
                  width="150px"
                  className="card-img-top"
                />
                <p
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  { each.nationality }
                  {' '}
                  -
                  {' '}
                  { each.category }
                </p>
                <h5
                  data-testid={ `${i}-horizontal-name` }
                >
                  { each.name }
                </h5>
              </Link>
              <button
                data-testid={ `${i}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => {
                  setShoeMsg(true);
                  navigator.clipboard.writeText(`http://localhost:3000/foods/${each.id}`);
                } }
              >
                <img src={ shareIcon } alt="share" />
              </button>
              {showMsg && <p>Link copied!</p>}
              <button
                data-testid={ `${i}-horizontal-favorite-btn` }
                type="button"
                src={ blackHeartIcon }
                onClick={ () => handleUnfavorite(each.id) }
              >
                <img src={ blackHeartIcon } alt="share" />
              </button>

            </div>
          )
          : (
            <div
              className="card"
              width="150px"
              key={ i }
            >
              <Link
                to={ `/drinks/${each.id}` }
              >

                <img
                  className="card-img-top img-thumbnail"
                  width="150px"
                  data-testid={ `${i}-horizontal-image` }
                  alt={ each.name }
                  src={ each.image }
                />
                <div
                  className="card-body"
                >
                  <p
                    className="d-flex
                  justify-content-center
                  mb-0
                  "
                    data-testid={ `${i}-horizontal-top-text` }
                  >
                    { each.alcoholicOrNot }
                  </p>
                  <h5
                    className="d-flex
                  justify-content-center
                  mb-0
                  align-items-space-between
                  "
                    data-testid={ `${i}-horizontal-name` }
                  >
                    { each.name }
                  </h5>
                </div>
              </Link>
              <button
                className="btn btn-light"
                data-testid={ `${i}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => {
                  setShoeMsg(true);
                  navigator.clipboard.writeText(`http://localhost:3000/drinks/${each.id}`);
                } }
              >
                <img src={ shareIcon } alt="share" />
              </button>
              {showMsg && <p>Link copied!</p>}
              <button
                className="btn btn-light"
                data-testid={ `${i}-horizontal-favorite-btn` }
                type="button"
                src={ blackHeartIcon }
                onClick={ () => handleUnfavorite(each.id) }
              >
                <img src={ blackHeartIcon } alt="share" />
              </button>
            </div>
          )
      )) }
    </>
  );
}

export default FavoriteRecipes;
