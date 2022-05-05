import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipes);
  return (
    <>
      <HeaderNoSearch />
      <section>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      <section>
        {doneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width="40px"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share
            </button>
            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export default DoneRecipes;
