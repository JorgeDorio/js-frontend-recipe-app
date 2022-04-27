import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function DrinkCategoryList() {
  const { drinkCategories } = useContext(ApiContext);
  console.log(drinkCategories);
  const MEALS_LENGTH = 5;
  const fiveCategories = drinkCategories?.slice(0, MEALS_LENGTH);
  const categoriesList = fiveCategories?.map((category) => category.strCategory);
  return (
    <>
      Categorias
      <div>
        {categoriesList && categoriesList.map((category) => (
          <button
            type="button"
            key={ category }
            data-testid={ `${category}-category-filter` }
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default DrinkCategoryList;
