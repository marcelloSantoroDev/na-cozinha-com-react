import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import localStorageMock from './helpers/localStorageMock';

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const favoriteString = 'favorite-btn';

const mealPathString = '/meals/52977';

const drinkPathString = '/drinks/13501';

const drinkLocalStorageMock = { drinks: { 15997: [0, 1, 2] }, meals: {} };

const mealFavoritedMock = [{
  id: '52977',
  type: 'meal',
  nationality: 'test',
  category: 'teste',
  name: 'Corba',
  image: 'teste',
  alcoholicOrNot: '' }];

describe('testes tela de detalhes - meals', () => {
  global.execCommand = jest.fn();
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

    localStorage.removeItem('inProgressRecipes');
  });
  test('4', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });

    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
  });
  test('5', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealFavoritedMock));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });

    const favoriteButton = await screen.findByTestId('favorite-btn');
    const favoriteImg = await within(favoriteButton).findByRole('img');
    expect(favoriteImg.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteButton);

    localStorage.removeItem('favoriteRecipes');
  });
  test('6', async () => {
    // localStorage.setItem('doneRecipes', JSON.stringify([{ id: '13501' }]));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });

    expect(await screen.findByRole('img', { name: 'GG' })).toBeInTheDocument();
    // expect(await screen.findByRole('img', { name: 'Corba' }).src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    expect(await screen.findByRole('img', { name: 'A1' })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'ABC' })).toBeInTheDocument();

    // expect(await screen.findByRole('paragraph', { name: 'Corba' })).toBeInTheDocument();

    localStorage.removeItem('doneRecipes');
  });
});

describe('testes tela de detalhes - drinks', () => {
  test('1', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkLocalStorageMock));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    expect(await screen.findByRole('heading', { name: /ABC/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /ABC/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /start recipe/i })).toBeInTheDocument();

    localStorage.removeItem('inProgressRecipes');
  });
  test('2', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkLocalStorageMock));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });

    expect(history.location.pathname).toBe(drinkPathString);
    const favoriteButton = await screen.findByTestId(favoriteString);
    const startRecipe = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(favoriteButton);
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/drinks/13501/in-progress');

    localStorage.removeItem('inProgressRecipes');
  });
  test('3', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 13501: 'test' } }));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    const continueRecipe = await screen.findByRole('button', { name: /continue recipe/i });
    expect(continueRecipe).toBeInTheDocument();

    localStorage.removeItem('inProgressRecipes');
  });
  test('4', async () => {
    // localStorage.setItem('doneRecipes', JSON.stringify([{ id: '13501' }]));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });

    expect(await screen.findByRole('img', { name: 'Corba' })).toBeInTheDocument();
    // expect(await screen.findByRole('img', { name: 'Corba' }).src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    expect(await screen.findByRole('img', { name: 'Burek' })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Sushi' })).toBeInTheDocument();

    // expect(await screen.findByRole('paragraph', { name: 'Corba' })).toBeInTheDocument();

    localStorage.removeItem('doneRecipes');
  });
  test('5', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });

    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
  });
  test('6', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealFavoritedMock));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });

    const favoriteButton = await screen.findByTestId(favoriteString);
    const favoriteImg = await within(favoriteButton).findByRole('img');
    expect(favoriteImg.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favoriteButton);

    localStorage.removeItem('favoriteRecipes');
  });
});
