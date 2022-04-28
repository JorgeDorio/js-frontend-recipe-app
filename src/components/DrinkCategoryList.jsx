import React, { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

function DrinkCategoryList() {
  const { drinkCategories,
    getApiDrinksByCategory, getApiDrinks } = useContext(ApiContext);
  const MEALS_LENGTH = 5;
  const fiveCategories = drinkCategories?.slice(0, MEALS_LENGTH);
  const categoriesList = fiveCategories?.map((category) => category.strCategory);

  const [clickedCategory, setClickedCategory] = useState('');

  const handleCategoryClick = (target, category) => {
    setClickedCategory(target.value);
    if (clickedCategory === category) {
      getApiDrinks();
    } else {
      getApiDrinksByCategory(category);
    }
  };

  return (
    <>
      Categorias
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getApiDrinks() }
        >
          All
        </button>
        {categoriesList && categoriesList.map((category) => (
          <button
            type="button"
            key={ category }
            value={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ ({ target }) => handleCategoryClick(target, category) }
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default DrinkCategoryList;
