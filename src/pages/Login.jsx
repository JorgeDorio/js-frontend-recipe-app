import React from 'react';

function Login() {
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
        />
      </label>
      <label
        htmlFor="password"
      >
        Senha
        <input
          id="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
