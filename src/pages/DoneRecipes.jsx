import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import '../style/doneRecipes.css';

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
      <section className="categoryList-container container-buttons btn-container">
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={ () => setRendering(doneRecipes) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={ () => setRendering(foods) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={ () => setRendering(drinks) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {rendering.map((recipe, index) => (
          <Card
            key={ recipe.id }
            className="mt-3 card"
            style={ { width: '21rem' } }
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img-top"
                src={ recipe.image }
                alt={ recipe.name }
                width="120px"
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
                className="card-title"
              >
                { recipe.name }
              </p>
            </Link>

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
            <div>
              { recipe.type === 'food' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="done-type"
                >
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>)}
              { recipe.type === 'drink' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="done-type"
                >
                  { `${recipe.alcoholicOrNot} - ${recipe.category}` }
                </p>)}
            </div>
            <p data-testid={ `${index}-horizontal-done-date` } className="done-date">
              Done in:
              {' '}
              {recipe.doneDate}
            </p>
            <div className="tags">
              {recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {`#${tag} `}
                </span>
              ))}
            </div>

          </Card>))}
      </section>
    </>
  );
}

export default DoneRecipes;
