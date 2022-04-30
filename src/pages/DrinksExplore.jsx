import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import { getRandomDrink } from '../services/getApi';

function DrinksExplore() {
  const history = useHistory();

  const surpriseMe = () => {
    getRandomDrink().then(({ drinks }) => {
      history.push(`/drinks/${drinks[0].idDrink}`);
    });
  };

  return (
    <>
      <HeaderNoSearch />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default DrinksExplore;
