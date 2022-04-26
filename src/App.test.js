import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

//***** TELA DE LOGIN *****;
//***** requisitos  2 ao 5 *****/
describe('Testa se os seguintes elementos estão presentes', () => {
  beforeEach(() => {
    render(
      <App />
    );
  });

  test('se o input de email do usuário está presente', () => {
    const userMail = screen.getByTestId('email-input');
    expect(userMail).toBeInTheDocument();
  });

  test('se o input de senha está presente', () => {
    const userPassWord = screen.getByTestId('password-input');
    expect(userPassWord).toBeInTheDocument();
  });

  test('se o botão para submeter os dados do usuário está presente', () => {
    const userBtn = screen.getByTestId('login-submit-btn');
    expect(userBtn).toBeInTheDocument();
    expect(userBtn).toBeDisabled();
  });
});
