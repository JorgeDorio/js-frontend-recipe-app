import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import getCategories from '../services/getApi';

const ApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getApiCategories = async () => {
    const api = await getCategories();
    setCategories(api);
    console.log(categories);
  };

  useEffect(() => {
    getApiCategories();
  }, []);

  const values = { categories };

  return (
    <context.Provider value={ values }>
      { children }
    </context.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
