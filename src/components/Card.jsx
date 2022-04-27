import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Card() {
  const { meals } = useContext(ApiContext);
  const RECIPES_LENGTH = 12;
  const twelveMeals = meals.slice(0, RECIPES_LENGTH);
  return (
    <div>
      {twelveMeals && twelveMeals.map((meal, i) => (
        <div
          key={ meal.idMeal }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            width="50px"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${i}-card-img` }
          />
          <p
            data-testid={ `${i}-card-name` }
          >
            { meal.strMeal }
          </p>
        </div>

      ))}
    </div>
  );
}

export default Card;
