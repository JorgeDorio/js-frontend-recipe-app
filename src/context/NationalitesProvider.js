import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NationalitiesContext from './NationalitiesContext';
import { getMealsNationalities,
  fetchMealsByNationalities } from '../services/nationalitiesApi';

const NationalitiesProvider = ({ children }) => {
  const [nationalities, setNationalities] = useState([]);
  const [selected, setSelected] = useState('All');
  const [nationMeals, setNationMeals] = useState([]);

  const handleNationalities = async () => {
    const apiNations = await getMealsNationalities();
    setNationalities(apiNations);
  };

  useEffect(() => {
    handleNationalities();
    const handleFilteredNationalities = async () => {
      const mealByNation = await fetchMealsByNationalities(selected);
      setNationMeals(mealByNation);
    };
    handleFilteredNationalities();
  }, [selected]);

  const value = {
    nationalities,
    selected,
    nationMeals,
    setSelected,
  };

  return (
    <NationalitiesContext.Provider value={ value }>
      { children }
    </NationalitiesContext.Provider>
  );
};

NationalitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NationalitiesProvider;
