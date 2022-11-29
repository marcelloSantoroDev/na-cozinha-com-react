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

    userEvent.type(inputPassword, '1231231');
    expect(loginButton).toBeEnabled();
  });
  test('2', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'tryber@teste.com');
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');
  });
});
