import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(true);

  const validation = () => {
    const MIN_LENGTH = 6;
    const requiredPassword = password.length > MIN_LENGTH;
    const requiredEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = requiredEmail.test(email);

    const isValid = requiredPassword && validateEmail;
    if (isValid) {
      setBtn(!isValid);
    }
  };

  useEffect(() => {
    validation();
  }, [email, password]);

  const userData = {
    email,
    setEmail,
    password,
    setPassword,
    btn,
    setBtn,
  };

  return (
    <context.Provider value={ userData }>
      { children }
    </context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
