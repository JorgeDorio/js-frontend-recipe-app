import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function CategoryList() {
  const { categories } = useContext(ApiContext);
  const { meals } = categories;
  const MEALS_LENGTH = 5;
  const fiveCategories = meals?.slice(0, MEALS_LENGTH);
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

export default CategoryList;
