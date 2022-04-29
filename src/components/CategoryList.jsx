import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function CategoryList() {
  const { categories,
    getApiMealsByCategory, getApiMeals,
    clickedCategory, setClickedCategory } = useContext(ApiContext);
  const { meals } = categories;
  const MEALS_LENGTH = 5;
  const fiveCategories = meals?.slice(0, MEALS_LENGTH);
  const categoriesList = fiveCategories?.map(
    (category) => category.strCategory,
  );
  // const [clickedCategory, setClickedCategory] = useState('');

  const handleCategoryClick = (target, category) => {
    setClickedCategory(target.value);
    if (clickedCategory === category) {
      console.log('cliquei na mesma categoria');
      getApiMeals();
    } else {
      console.log('cliquei em outra categoria');
      getApiMealsByCategory(category);
    }
  };

  return (
    <>
      Categorias
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getApiMeals() }
        >
          All
        </button>
        {categoriesList
          && categoriesList.map((category) => (
            <button
              type="button"
              key={ category }
              value={ category }
              data-testid={ `${category}-category-filter` }
              onClick={
                ({ target }) => handleCategoryClick(target, category)
              }
            >
              {category}
            </button>
          ))}
      </div>
    </>
  );
}

export default CategoryList;
