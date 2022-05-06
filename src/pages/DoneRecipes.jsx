import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(doneRecipes);
  const [foods, setFoods] = useState();
  const [drinks, setDrinks] = useState();
  const [rendering, setRendering] = useState(doneRecipes);
  const [shared, setShared] = useState(false);

  const sortingTypes = () => {
    setFoods(doneRecipes.filter((recipe) => recipe.type === 'food'));
    setDrinks(doneRecipes.filter((recipe) => recipe.type === 'drink'));
  };

  useEffect(() => {
    sortingTypes();
  }, []);

  return (
    <>
      <HeaderNoSearch />
      <section>
        <button
          type="button"
          onClick={ () => setRendering(doneRecipes) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setRendering(foods) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => setRendering(drinks) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {rendering.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width="40px"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </Link>
            { recipe.type === 'food' && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </p>)}
            { recipe.type === 'drink' && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.alcoholicOrNot} - ${recipe.category}` }
              </p>)}
            <p>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              src={ shareIcon }
              onClick={ () => {
                setShared(true);
                navigator.clipboard.writeText(
                  `${window.location.origin}/${recipe.type}s/${recipe.id}`,
                );
              } }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            { shared && <p>Link copied!</p> }
            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>))}
      </section>
    </>
  );
}

export default DoneRecipes;
