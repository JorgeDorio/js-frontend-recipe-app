import React, { useState, useEffect } from 'react';
import { Card, CardColumns, CardImg } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  getMealsNationalities,
  fetchMealsByNationalities,
} from '../services/nationalitiesApi';

function ExploreNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [selected, setSelected] = useState('American');
  const [nationMeals, setNationMeals] = useState([]);

  const arrayLength = 12;

  const handleNationalities = async () => {
    const apiNations = await getMealsNationalities();
    setNationalities(apiNations);
  };

  const handleChange = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    handleNationalities();
    const handleFilteredNationalities = async () => {
      const mealByNation = await fetchMealsByNationalities(selected);
      setNationMeals(mealByNation);
    };
    handleFilteredNationalities();
  }, [selected]);

  // useEffect(() => {
  //   const handleFilteredNationalities = async () => {
  //     const mealByNation = await fetchMealsByNationalities(selected);
  //     setNationMeals(mealByNation);
  //   };
  //   handleFilteredNationalities();
  // }, [selected]);

  return (
    <>

      <select
        name="select"
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target: { value } }) => handleChange(value) }
      >
        <option value="All">All</option>
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

      { nationMeals
        && nationMeals
          .slice(0, arrayLength)
          .map((meal, index) => (
            <Link
              key={ index }
              to={ `/foods/${meal.idMeal}` }
            >
              <Card
                data-testid={ `${index}-recipe-card` }
                value={ meal.idMeal }
                className="mt-3"
                style={ { width: '12rem' } }
              >
                <CardImg
                  src={ meal.strMealThumb }
                  alt={ meal.idMeal }
                  data-testid={ `${index}-card-img` }
                />

                <CardColumns />
                {' '}
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>

              </Card>
            </Link>
          )) }

    </>
  );
}

export default ExploreNationalities;
