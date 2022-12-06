import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const favoriteString = 'favorite-btn';

const mealPathString = '/meals/52977';

const drinkPathString = '/drinks/13501';

describe('testes tela de detalhes - meals', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByTestId(favoriteString)).toBeInTheDocument();
    expect(await screen.findByTestId(favoriteString)).toHaveTextContent('Favorite');
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /start recipe/i })).toBeInTheDocument();
    // expect(await (await findByTestId('recipe-category')).innerText).toBe(/side/i)
  });
  test('2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });
    const favoriteButton = await screen.findByTestId(favoriteString);
    const startRecipe = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(favoriteButton);
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('3', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: 'test' } }));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });
    const continueRecipe = await screen.findByRole('button', { name: /continue recipe/i });
    expect(continueRecipe).toBeInTheDocument();
  });
});

describe('testes tela de detalhes - drinks', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    expect(await screen.findByRole('heading', { name: /ABC/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /ABC/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /start recipe/i })).toBeInTheDocument();
  });
  test('2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    const favoriteButton = await screen.findByTestId(favoriteString);
    const startRecipe = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(favoriteButton);
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/drinks/13501/in-progress');
  });
  test('3', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 13501: 'test' } }));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    const continueRecipe = await screen.findByRole('button', { name: /continue recipe/i });
    expect(continueRecipe).toBeInTheDocument();
  });
  test('4', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '13501' }]));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
  });
});
