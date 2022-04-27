import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

const HeaderNoSearch = () => {
  const history = useHistory();
  const location = useLocation();

  const routes = {
    '/explore': 'Explore',
    '/explore/drinks': 'Explore Drinks',
    '/explore/foods': 'Explore Foods',
    '/explore/foods/ingredients': 'Explore Ingredients',
    '/explore/drinks/ingredients': 'Explore Ingredients',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  return (
    <div>
      <header>
        {/* IMG roles visto em: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img */}
        <img
          role="presentation"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="user-profile"
          onClick={ () => history.push('/profile') }
        />

        <h2 data-testid="page-title">{routes[location.pathname]}</h2>

      </header>
    </div>
  );
};

export default HeaderNoSearch;
