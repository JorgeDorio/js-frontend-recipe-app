import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ApiContext from '../context/ApiContext';

function Card() {
  const { meals } = useContext(ApiContext);
  const history = useHistory();

  const RECIPES_LENGTH = 12;
  console.log(meals);
  const validMeals = meals.length > RECIPES_LENGTH;
  let twelveMeals = '';
  if (!validMeals) {
    twelveMeals = meals;
    if (meals.length === 1) {
      history.push(`/foods/${meals[0].idMeal}`);
    }
  } else {
    twelveMeals = meals.slice(0, RECIPES_LENGTH);
  }

  return (
    <div>
      {twelveMeals && twelveMeals.map((meal, i) => (
        <Link
          to={ `/foods/${meal.idMeal}` }
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
        </Link>

      ))}
    </div>
  );
}

export default Card;
