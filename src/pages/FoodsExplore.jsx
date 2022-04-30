import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import { getRandomFood } from '../services/getApi';

function FoodExplore() {
  const history = useHistory();

  const surpriseMe = () => {
    getRandomFood().then(({ meals }) => {
      history.push(`/foods/${meals[0].idMeal}`);
    });
  };

  return (
    <>
      <HeaderNoSearch />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => surpriseMe() }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default FoodExplore;
