import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ApiContext from '../context/ApiContext';

function CardDrink() {
  const { drinks } = useContext(ApiContext);
  const history = useHistory();

  const RECIPES_LENGTH = 12;
  const twelveDrinks = drinks?.slice(0, RECIPES_LENGTH);

  if (drinks?.length === 1) {
    history.push(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div>
      {twelveDrinks && twelveDrinks.map((drink, i) => (
        <Link
          to={ `/drinks/${drink.idDrink}` }
          key={ drink.idDrink }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            width="50px"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${i}-card-img` }
          />
          <p
            data-testid={ `${i}-card-name` }
          >
            { drink.strDrink }
          </p>
        </Link>

      ))}
    </div>
  );
}

export default CardDrink;
