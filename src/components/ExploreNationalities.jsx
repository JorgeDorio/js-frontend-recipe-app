import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
} from '../services/nationalitiesApi';
import NationalitiesContext from '../context/NationalitiesContext';
import ApiContext from '../context/ApiContext';

function ExploreNationalities() {
  const { nationalities,
    nationMeals,
    setSelected,
    selected,
  } = useContext(NationalitiesContext);

  const { meals } = useContext(ApiContext);

  const arrayLength = 12;

  const handleChange = (target) => {
    setSelected(target);
  };

  return (
    <>

      <select
        name="select"
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target: { value } }) => handleChange(value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        { nationalities.map((nation, i) => (
          <option
            value={ nation.strArea }
            key={ i }
            data-testid={ `${nation.strArea}-option` }
          >
            {nation.strArea}
          </option>
        ))}
      </select>

      { selected === 'All'
        ? meals
          && meals
            .slice(0, arrayLength)
            .map((meal, index) => (
              <Link
                key={ index }
                to={ `/foods/${meal.idMeal}` }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  value={ meal.idMeal }
                  className="mt-3"
                  style={ { width: '12rem' } }
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.idMeal }
                    data-testid={ `${index}-card-img` }
                    width="150ox"
                  />
                  <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>

                </div>
              </Link>
            ))

        : nationMeals
        && nationMeals
          .slice(0, arrayLength)
          .map((meal, index) => (
            <Link
              key={ index }
              to={ `/foods/${meal.idMeal}` }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                value={ meal.idMeal }
                className="mt-3"
                style={ { width: '12rem' } }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.idMeal }
                  data-testid={ `${index}-card-img` }
                  width="150ox"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>

              </div>
            </Link>
          )) }

    </>
  );
}

export default ExploreNationalities;
