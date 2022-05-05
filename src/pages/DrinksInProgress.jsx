import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IngredientProgress from '../components/IngredientProgress';
import { getDrinksApiId } from '../services/getApi';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinksinProgress() {
  const [recipe, setRecipe] = useState([{}]);
  const { id } = useParams();
  const [showMsg, setShoeMsg] = useState(false);

  const [isFilled, setIsFilled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);

  const toggleFill = () => {
    const {
      strDrinkThumb,
      strDrink,
      strCategory,
      strAlcoholic,
      strArea,
    } = recipe[0];

    const recObj = {
      id,
      type: 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    if (isFilled) {
      setIsFilled(false);
      setIsFavorite(whiteHeartIcon);
    } else {
      const localStorageArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || '';
      const currentArray = [...localStorageArray];
      currentArray.push(recObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(currentArray));
      setIsFilled(true);
      setIsFavorite(blackHeartIcon);
    }
  };

  const getFromApiID = async () => {
    const details = await getDrinksApiId(id);
    setRecipe(details);
  };

  const verifyFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const getFavorite = favoriteRecipes
      ? favoriteRecipes.filter((rec) => rec.id === id)
      : [];
    if (getFavorite.length) {
      setIsFavorite(blackHeartIcon);
      setIsFilled(true);
    }
  };

  useEffect(() => {
    getFromApiID();
  }, []);

  useEffect(() => {
    verifyFavorite();
  }, []);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe[0];

  return (
    <>
      {/* <button
        data-testid="favorite-btn"
        type="button"
        onClick={ toggleFill }
        src={ isFavorite }
        >
        <img src={ isFavorite } alt="favorite" />
      </button> */}
      <img
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h2 data-testid="recipe-title">{strDrink}</h2>

      <h3 data-testid="recipe-category">{strAlcoholic}</h3>

      <div>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ toggleFill }
          src={ isFavorite }
        >
          <img src={ isFavorite } alt="favorite" />
        </button>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            setShoeMsg(true);
            navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
          } }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {showMsg && <p>Link copied!</p>}
      </div>

      <p data-testid="instructions">{strInstructions}</p>

      <IngredientProgress />
    </>
  );
}

export default DrinksinProgress;
