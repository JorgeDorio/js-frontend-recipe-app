import React from 'react';
import CardDrink from '../components/CardDrink';
import DrinkCategoryList from '../components/DrinkCategoryList';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <>
      <Header />
      <DrinkCategoryList />
      <CardDrink />
      <Footer />
    </>
  );
}

export default Drinks;
