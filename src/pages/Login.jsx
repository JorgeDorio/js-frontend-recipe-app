import React, { useContext } from 'react';
import context from '../context/context';

function Login() {
  const { email, setEmail, password, setPassword, btn } = useContext(context);

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <>
      <h1>
        Login
      </h1>

      <label
        htmlFor="email"
      >
        Email
        <input
          id="email"
          data-testid="email-input"
          value={ email }
          type="text"
          onChange={ handleEmailChange }
        />
      </label>
      <label
        htmlFor="password"
      >
        Senha
        <input
          id="password"
          data-testid="password-input"
          value={ password }
          type="password"
          onChange={ handlePasswordChange }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ btn }
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
