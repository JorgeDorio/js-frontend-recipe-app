import React from 'react';
import { useHistory } from 'react-router-dom';
import { getStorageEmail } from '../storage';

function ProfileSpecs() {
  const { email } = getStorageEmail();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <p
        data-testid="profile-email"
      >
        { email }
      </p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => handleLogout() }
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileSpecs;
