import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function CardDrink() {
  const { drinks } = useContext(ApiContext);
  const RECIPES_LENGTH = 12;
  const twelveDrinks = drinks.slice(0, RECIPES_LENGTH);
  return (
    <div>
      {twelveDrinks && twelveDrinks.map((drink, i) => (
        <div
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
        </div>

      ))}
    </div>
  );
}

export default CardDrink;
