import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const categories = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

const emailString = 'email-input';
const passwordString = 'password-input';
const loginButtonString = 'login-submit-btn';
const emailTypeString = 'tryber@teste.com';
const testIdString = '0-card-name';

describe('testes da tela principal - rota /meals', () => {
  test('1', async () => {
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

  test('2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Beef and Mustard Pie');
    });
  });
  test('3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: /breakfast/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Breakfast Potatoes');
    });
  });
  test('4', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: 'Chicken' });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Ayam Percik');
    });
  });

  test('5', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: /dessert/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Apam balik');
    });
  });

  test('6', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: /goat/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Mbuzi Choma (Roasted Goat)');
    });
  });

  test('7', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const beefButton = await screen.findByRole('button', { name: /all/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Corba');
    });
  });
});

describe('testes da tela principal - rota /drinks', () => {
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
  test('3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('3-Mile Long Island Iced Tea');
    });
  });
  test('4', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: /cocktail/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('155 Belmont');
    });
  });
  test('5', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: /shake/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('151 Florida Bushwacker');
    });
  });
  test('6', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: 'Other / Unknown' });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('A Piece of Ass');
    });
  });
  test('7', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: 'Cocoa' });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('Castillian Hot Chocolate');
    });
  });
  test('8', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const beefButton = await screen.findByRole('button', { name: /all/i });
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);
    await waitFor(() => {
      const recipeIndexZero = screen.getByTestId(testIdString);
      expect(recipeIndexZero).toHaveTextContent('GG');
    });
  });
});
