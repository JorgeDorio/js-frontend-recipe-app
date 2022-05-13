import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ApiContext from '../context/ApiContext';
import '../style/Cards.css';

function Card() {
  const { meals, clickedCategory } = useContext(ApiContext);
  const history = useHistory();
  const RECIPES_LENGTH = 12;
  const validMeals = meals?.length > RECIPES_LENGTH;
  let twelveMeals = '';
  if (!validMeals) {
    twelveMeals = meals;
    if (meals?.length === 1 && clickedCategory !== 'Goat') {
      history.push(`/foods/${meals[0].idMeal}`);
    }
  } else {
    twelveMeals = meals.slice(0, RECIPES_LENGTH);
  }

  return (
    <div className="col">
      {twelveMeals && twelveMeals.map((meal, i) => (
        <Link
          to={ `/foods/${meal.idMeal}` }
          key={ meal.idMeal }
          data-testid={ `${i}-recipe-card` }
        >
          <div className="card">
            <img
              className="card-img-top"
              width="50px"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${i}-card-img` }
            />
            <div className="card-body">
              <p
                className="card-title"
                data-testid={ `${i}-card-name` }
              >
                { meal.strMeal }
              </p>
            </div>
          </div>
        </Link>

      ))}
    </div>
  );
}

export default Card;
