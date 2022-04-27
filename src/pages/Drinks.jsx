import React from 'react';
import CardDrink from '../components/CardDrink';
import DrinkCategoryList from '../components/DrinkCategoryList';
import Header from '../components/Header';

function Drinks() {
  return (
    <>
      <Header />
      <DrinkCategoryList />
      <CardDrink />
    </>
  );
}

export default Drinks;
