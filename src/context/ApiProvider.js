import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import { getCategories, getCategoriesDrinks, getDrinks,
  getMeals,
  getMealsByCategory, getDrinksByCategory } from '../services/getApi';

const ApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filtered, setFiltered] = useState(false);

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
    setFiltered(false);
  };

  const getApiMealsByCategory = async (category) => {
    const api = await getMealsByCategory(category);
    setFiltered(true);
    setMeals(api);
  };

  const getApiDrinks = async () => {
    const api = await getDrinks();
    setDrinks(api);
    setFiltered(false);
  };

  const getApiDrinksByCategory = async (category) => {
    const api = await getDrinksByCategory(category);
    setDrinks(api);
    setFiltered(true);
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
    getApiMealsByCategory,
    getApiDrinksByCategory,
    filtered,
    setFiltered,
    getApiMeals,
    getApiDrinks,
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
