import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/header.css';

const Header = () => {
  const history = useHistory();
  // uso de useLocation visto em: https://v5.reactrouter.com/web/api/Hooks/uselocation
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(false);

  const routes = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/explore/foods/nationalities': 'Explore Nationalities',
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
          onClick={ () => setSearchInput(!searchInput) }
        >

          <img
            role="presentation"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>

      </header>

      {searchInput
        ? (
          <form>
            <section className="search-input">
              <input data-testid="search-input" />
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
                  label="Ingrediente"
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
                  label="Nome"
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
                  label="Primeira Letra"
                />
              </label>
            </section>
            <button type="button" data-testid="exec-search-btn">Busca</button>
          </form>
        ) : null }

    </div>
  );
};

export default Header;
