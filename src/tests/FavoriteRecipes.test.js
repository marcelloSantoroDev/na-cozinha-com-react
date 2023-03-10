import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const favoritePath = '/favorite-recipes';

const localStorageArray = [
  { id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' },
  { id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
];

describe('Testes da tela "FavoriteRecipes.js":', () => {
  afterEach(() => {
    localStorage.removeItem('favoriteRecipes');
  });

  global.execCommand = jest.fn();
  test('1), verifica elementos renderizados:', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(favoritePath);
    });

    expect(await screen.findByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();

    expect(await screen.findByText('Corba')).toBeInTheDocument();
    expect(await screen.findByText('GG')).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: /all/i }));
    userEvent.click(await screen.findByRole('button', { name: /meals/i }));
    userEvent.click(await screen.findByRole('button', { name: /drinks/i }));
  });
  test('2', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(favoritePath);
    });

    const shareClick = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareClick).toBeInTheDocument();
    const unfavorite = await screen.findByTestId('0-horizontal-favorite-btn');
    expect(unfavorite).toBeInTheDocument();
    userEvent.click(unfavorite);
  });
  test('3', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(favoritePath);
    });

    const shareClick = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareClick).toBeInTheDocument();
    userEvent.click(shareClick);
    // expect(await screen.findByText('Link copied')).toBeInTheDocument();
  });
  test('4', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(favoritePath);
    });

    const shareClick = await screen.findByTestId('1-horizontal-share-btn');
    expect(shareClick).toBeInTheDocument();
    userEvent.click(shareClick);
    // expect(await screen.findByText('Link copied')).toBeInTheDocument();
  });
});
