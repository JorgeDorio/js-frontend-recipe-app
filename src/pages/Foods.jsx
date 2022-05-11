import React from 'react';
import CategoryList from '../components/CategoryList';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../style/Foods.css';

function Foods() {
  return (
    <>
      <Header />
      <CategoryList />
      <Card />
      <Footer />
    </>
  );
}

export default Foods;
