import React, { useContext, useState } from 'react';
import context from '../context/context';
import Header from '../components/Header';

function Foods() {
  const { categories } = useContext(context);
  const [categoriesList, setCategoriesList] = useState([]);

  console.log(categoriesList);
  return (
    <>
      <Header />
      {console.log(categories)}
      <h2>Foods</h2>
    </>
  );
}

export default Foods;
