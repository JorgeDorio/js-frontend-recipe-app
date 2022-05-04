// import React, { useEffect, useState } from 'react';
import React from 'react';

function IngredientProgress() {
  // const [progress, setProgress] = useState([]);
  // // const [isChecked, setIsChecked] = useState([]);

  // const getRecipes = () => {
  //   const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes')) || '';
  //   setProgress(meals);
  // };

  // useEffect(() => {
  //   getRecipes();
  // }, []);

  return (
    <>
      <h3>List of Ingredients</h3>
      {/* { progress.map((ingredient, index) => (
        <input
          key={ index }
          type="checkbox"
          value={ ingredient }
          defaultChecked={ ingredient }
        />
      ))} */}
    </>
  );
}

export default IngredientProgress;
