import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import { getCategories, getCategoriesDrinks, getDrinks,
  getMeals } from '../services/getApi';

const ApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const getApiCategories = async () => {
    const api = await getCategories();
    setCategories(api);
  };

  const getApiDrinkCategories = async () => {
    const api = await getCategoriesDrinks();
    setDrinkCategories(api);
  };

  const getApiMeals = async () => {
    const api = await getMeals();
    setMeals(api);
  };

  const getApiDrinks = async () => {
    const api = await getDrinks();
    setDrinks(api);
  };

  useEffect(() => {
    getApiCategories();
    getApiDrinkCategories();
    getApiMeals();
    getApiDrinks();
  }, []);

  const values = {
    categories,
    drinkCategories,
    meals,
    drinks,
  };

  return (
    <ApiContext.Provider value={ values }>
      { children }
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
