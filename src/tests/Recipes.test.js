import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const categories = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

const emailString = 'email-input';
const passwordString = 'password-input';
const loginButtonString = 'login-submit-btn';
const emailTypeString = 'tryber@teste.com';

describe('testes da tela principal', () => {
  test('1 - /meals', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const loginButton = screen.getByTestId(loginButtonString);

    userEvent.type(inputEmail, emailTypeString);
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    categories.forEach(async (category) => {
      expect(await screen.findByRole('button', { name: category })).toBeInTheDocument();
    });
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });
  test('2 - /drink', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const loginButton = screen.getByTestId(loginButtonString);

    userEvent.type(inputEmail, emailTypeString);
    userEvent.type(inputPassword, '1231231');
    userEvent.click(loginButton);

    userEvent.click(screen.getByRole('img', { name: /drink icon/i }));
    expect(await screen.findByText(/gg/i)).toBeInTheDocument();
  });
});
