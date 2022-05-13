import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import { setTokens, setStorageEmail } from '../storage';
import '../style/Login.css';
import LOGO from '../assets/logo.png';

function Login() {
  const { email, setEmail, password, setPassword, btn } = useContext(context);
  const history = useHistory();

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmitBtn = () => {
    setTokens();
    setStorageEmail(email);
    history.push('/foods');
  };

  return (
    <div className="login-page-container">
      <div className="logo-container">
        <img src={ LOGO } alt="logo da trybe Kitchen" className="logo" />
      </div>
      <div className="input-container">
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
          className="btn btn-success"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ btn }
          onClick={ handleSubmitBtn }
        >
          Entrar
        </button>
      </div>

    </div>
  );
}

export default Login;
