import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const url = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';
const doneRecipesPath = '/done-recipes';

const localStorageArray = [{
  nationality: 'Turkish',
  category: 'Soup',
  name: 'Corba',
  image: url,
  id: '52977',
  type: 'meal',
  tags: ['alou'],
}];

const localStorageArray2 = [{
  nationality: 'Turkish',
  category: 'Soup',
  name: 'Corba',
  image: url,
  id: '52977',
  type: 'drink',
  tags: [],
}];

describe('testes de tela feitas - meals', () => {
  afterEach(() => {
    localStorage.removeItem('doneRecipes');
  });

  global.execCommand = jest.fn();

  test('1', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    expect(await screen.findByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(await screen.findByText('Corba')).toBeInTheDocument();

    const link = await screen.findByRole('link', {
      name: /img corba/i,
    });

    const img = await within(link).findByRole('img', {
      name: /recipe/i,
    });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    userEvent.click(await screen.findByRole('button', { name: /all/i }));
    userEvent.click(await screen.findByRole('button', { name: /meals/i }));
    userEvent.click(await screen.findByRole('button', { name: /drinks/i }));

    userEvent.click(link);
  });

  test('2', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    const link = await screen.findByRole('link', {
      name: /img corba/i,
    });

    userEvent.click(link);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  test('3', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
  test('3', async () => {
    // refer??ncia https://erikmartinjordan.com/mock-up-jest-clipboardqq
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    expect(await screen.findByText('alou')).toBeInTheDocument();
  });
});

describe('testes de tela feitas - drinks', () => {
  afterEach(() => {
    localStorage.removeItem('doneRecipes');
  });

  global.execCommand = jest.fn();

  test('2', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray2));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    const link = await screen.findByRole('link', {
      name: /img corba/i,
    });

    userEvent.click(link);
    expect(history.location.pathname).toBe('/drinks/52977');
  });
  test('3', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray2));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(doneRecipesPath);
    });

    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
});
