import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/header.css';

const Header = () => {
  const history = useHistory();
  // uso de useLocation visto em: https://v5.reactrouter.com/web/api/Hooks/uselocation
  const location = useLocation();

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

        <img
          role="presentation"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search-icon"
        />
      </header>
    </div>
  );
};

export default Header;
