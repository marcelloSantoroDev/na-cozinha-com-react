import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailString = 'email-input';
const passwordString = 'password-input';
const loginButtonString = 'login-submit-btn';

const emailTypeString = 'tryber@teste.com';

describe('testes do header', () => {
  test('1', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const loginButton = screen.getByTestId(loginButtonString);

    userEvent.type(inputEmail, emailTypeString);
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    expect(profileIcon).toBeInTheDocument();

    const searchIcon = screen.getByRole('img', { name: /search icon/i });
    expect(searchIcon).toBeInTheDocument();

    const searchIconBtn = screen.getByRole('button', { name: /search icon/i });
    expect(searchIconBtn).toBeInTheDocument();

    const headerTitle = screen.getByRole('heading', { name: /meals/i });
    expect(headerTitle).toBeInTheDocument();
  });
  test('2', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const loginButton = screen.getByTestId(loginButtonString);

    userEvent.type(inputEmail, emailTypeString);
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });
  test('3', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const loginButton = screen.getByTestId(loginButtonString);

    userEvent.type(inputEmail, emailTypeString);
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    const searchIconBtn = screen.getByRole('button', { name: /search icon/i });
    userEvent.click(searchIconBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
