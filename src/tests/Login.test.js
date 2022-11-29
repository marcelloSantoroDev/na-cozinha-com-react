import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testes de login', () => {
  test('1', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeInTheDocument();

    userEvent.type(inputEmail, 'tryber@teste.com');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputPassword, '123123');
    expect(loginButton).toBeEnabled();
  });
});
