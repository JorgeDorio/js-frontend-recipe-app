import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ingredientsApi } from '../services/ingredientsApi';
import ApiContext from '../context/ApiContext';

function IngredientExploreCard() {
  const [ingredients, setIngredients] = useState([]);
  const arrayLength = 12;

  const { getApiMealsByIngredients } = useContext(ApiContext);

  const handleIngredients = async () => {
    const apiIngred = await ingredientsApi();
    setIngredients(apiIngred);
  };

  useEffect(() => {
    handleIngredients();
  }, []);

  return (
    <>
      {
        ingredients
          .slice(0, arrayLength)
          .map((each, i) => (
            <Link
              key={ i }
              to="/foods"
              data-testid={ `${i}-ingredient-card` }
              onClick={ () => getApiMealsByIngredients(each.strIngredient) }
            >
              <Card
                key={ i }
                data-testid={ `${i}-card-name` }
                className="mt-3"
                style={ { width: '8rem' } }
              >
                {each.strIngredient}

                <img
                  data-testid={ `${i}-card-img` }
                  alt={ each.strIngredient }
                  src={ `https://www.themealdb.com/images/ingredients/${each.strIngredient}-Small.png
                ` }
                />
              </Card>
            </Link>
          ))
      }
    </>
  );
}

export default IngredientExploreCard;
