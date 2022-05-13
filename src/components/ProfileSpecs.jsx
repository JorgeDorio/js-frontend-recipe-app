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
    <div className="body-profile">
      <p
        data-testid="profile-email"
        className="profile-email"
      >
        { email }
      </p>
      <div className="btns">
        <button
          className="pages"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="pages"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <button
        className="logout-btn"
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
