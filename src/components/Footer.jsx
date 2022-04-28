import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/header.css';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();

  return (
    <footer id="footer" data-testid="footer" className="position-fixed fixed-bottom">

      <img
        data-testid="drinks-bottom-btn"
        role="presentation"
        src={ drinkIcon }
        alt="drink-icon"
        onClick={ () => history.push('/drinks') }
      />

      <img
        data-testid="explore-bottom-btn"
        role="presentation"
        src={ exploreIcon }
        alt="explore-icon"
        onClick={ () => history.push('/explore') }
      />

      <img
        data-testid="food-bottom-btn"
        role="presentation"
        src={ mealIcon }
        alt="meal-icon"
        onClick={ () => history.push('/foods') }
      />

    </footer>
  );
};

export default Footer;
