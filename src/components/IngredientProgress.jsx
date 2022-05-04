import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsApiId } from '../services/getApi';

function IngredientProgress() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState(['a']);
  const [measure, setMeasure] = useState(['b']);
  const { id } = useParams();
  console.log(id);

  const getFromApiID = async () => {
    const details = await getMealsApiId(id);
    setRecipe(details);
  };

  useEffect(() => {
    getFromApiID();
  }, []);

  useEffect(() => {
    const keys = Object.entries(recipe);
    console.log(keys);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    console.log(filterIngredients);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
    console.log(filterMeasure);
  }, [recipe]);

  return (
    <>

      {ingredients.map((ingred, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingred} - ${measure[i]}`}
        </p>
      ))}

    </>
  );
}

export default IngredientProgress;
