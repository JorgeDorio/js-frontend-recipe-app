import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/header.css';
import ApiContext from '../context/ApiContext';
import verifyMeals from '../helpers';

const VALUE_INGREDIENTS = 'value-ingredients';
const VALUE_NAME = 'value-name';
const VALUE_FIRST_LETTER = 'value-first-letter';

const Header = () => {
  const history = useHistory();
  // uso de useLocation visto em: https://v5.reactrouter.com/web/api/Hooks/uselocation
  const location = useLocation();
  const [showBar, setShowBar] = useState(false);

  const {
    meals,
    drinks,
    setRadioValue,
    radioValue,
    searchInputValue,
    setSearchInputValue,
    getApiMealsByIngredients,
    getApiMealsByFirstLetter,
    getApiMealsByName,
    getApiDrinksByIngredients,
    getApiDrinksByFirstLetter,
    getApiDrinksByName,
  } = useContext(ApiContext);

  const routes = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/explore/foods/nationalities': 'Explore Nationalities',
  };

  const handleClick = (radio, inputValue) => {
    verifyMeals(meals, drinks, searchInputValue);
    if (location.pathname === '/foods') {
      switch (radio) {
      case VALUE_INGREDIENTS:
        return getApiMealsByIngredients(inputValue);
      case VALUE_NAME:
        return getApiMealsByName(inputValue);
      case VALUE_FIRST_LETTER:
        return getApiMealsByFirstLetter(inputValue);
      default: break;
      }
    } else {
      switch (radio) {
      case VALUE_INGREDIENTS:
        return getApiDrinksByIngredients(inputValue);
      case VALUE_NAME:
        return getApiDrinksByName(inputValue);
      case VALUE_FIRST_LETTER:
        return getApiDrinksByFirstLetter(inputValue);
      default: break;
      }
    }
  };

  // lógica do aviso global e do search Input;
  const handleInputChange = (value) => {
    if (value.length > 1 && radioValue === VALUE_FIRST_LETTER) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    setSearchInputValue(value);
  };

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  return (
    <div>
      <header id="header">
        {/* IMG roles visto em: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img */}
        <img
          role="presentation"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="user-profile"
          onClick={ () => history.push('/profile') }
        />

        <h2 data-testid="page-title">{routes[location.pathname]}</h2>

        <button
          type="button"
          onClick={ () => setShowBar(!showBar) }
        >

          <img
            role="presentation"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>

      </header>

      {showBar
        ? (
          <form>
            <section className="search-input">
              <input
                data-testid="search-input"
                onChange={ ({ target: { value } }) => handleInputChange(value) }
              />
            </section>
            <section className="radio-btns">
              <label htmlFor="ingredients">
                Ingredients
                <input
                  id="ingredients"
                  type="radio"
                  name="radio-name"
                  value="value-ingredients"
                  data-testid="ingredient-search-radio"
                  onChange={ ({ target: { value } }) => handleRadioChange(value) }
                />
              </label>
              <label htmlFor="search-name">
                Name
                <input
                  id="search-name"
                  type="radio"
                  name="radio-name"
                  value="value-name"
                  data-testid="name-search-radio"
                  onChange={ ({ target: { value } }) => handleRadioChange(value) }
                />

              </label>

              <label htmlFor="first-letter">
                Primeira Letra
                <input
                  id="first-letter"
                  type="radio"
                  name="radio-name"
                  value="value-first-letter"
                  data-testid="first-letter-search-radio"
                  onChange={ ({ target: { value } }) => handleRadioChange(value) }
                />
              </label>
            </section>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => handleClick(radioValue, searchInputValue) }
            >
              Busca
            </button>
          </form>
        ) : null }

    </div>
  );
};

export default Header;
