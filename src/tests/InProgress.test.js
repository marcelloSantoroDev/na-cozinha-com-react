import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mealPathString = '/meals/52977/in-progress';
const drinkPathString = '/drinks/17203/in-progress';

const mealLocalStorageMock = { drinks: {},
  meals: {
    52977: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] } };

const drinkLocalStorageMock = { drinks: { 17203: [0, 1] }, meals: {} };

const mealStepsArray = ['1 cup of Lentils',
  '1 large of Onion',
  '1 large of Carrots',
  '1 tbs of Tomato Puree',
  '2 tsp of Cumin',
  '1 tsp of Paprika',
  '1/2 tsp of Mint',
  '1/2 tsp of Thyme',
  '1/4 tsp of Black Pepper',
  '1/4 tsp of Red Pepper Flakes',
  '4 cups of Vegetable Stock',
  '1 cup of Water',
  'Pinch of Sea Salt',
];

const drinkStepsArray = ['1 part of Creme de Cassis', '5 parts of Champagne'];

describe('testes tela inProgress - meals', () => {
  afterEach(() => {
    localStorage.removeItem('inProgressRecipes');
  });
  global.execCommand = jest.fn();
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });

    expect(history.location.pathname).toBe(mealPathString);

    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();

    mealStepsArray.forEach((step, index) => {
      const label = screen.getByTestId(`${index}-ingredient-step`);
      expect(label).toHaveTextContent(step);
    });
  });

  test('2', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(mealLocalStorageMock));
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(mealPathString);
    });
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();

    await waitFor(() => {
      mealStepsArray.forEach((_step, index) => {
        const label = screen.getByTestId(`${index}-ingredient-step`);
        expect(label).toHaveClass('Checked');
        const checkbox = within(label).getByRole('checkbox');
        expect(checkbox).toBeChecked();
      });
    });
  });

  test('4', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(mealLocalStorageMock));
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(mealPathString);
    });

    const share = await screen.findByTestId('share-btn');
    expect(share).toBeInTheDocument();

    userEvent.click(share);

    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
});

describe('testes tela inProgress - drinks', () => {
  afterEach(() => {
    localStorage.removeItem('inProgressRecipes');
  });
  global.execCommand = jest.fn();
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });

    expect(history.location.pathname).toBe(drinkPathString);

    expect(await screen.findByRole('heading', { name: /kir/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /kir/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();

    drinkStepsArray.forEach((step, index) => {
      const label = screen.getByTestId(`${index}-ingredient-step`);
      expect(label).toHaveTextContent(step);
    });
  });

  test('2', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkLocalStorageMock));
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(drinkPathString);
    });

    expect(await screen.findByRole('heading', { name: /kir/i })).toBeInTheDocument();

    await waitFor(() => {
      drinkStepsArray.forEach((_s, index) => {
        const label2 = screen.getByTestId(`${index}-ingredient-step`);
        expect(label2).toHaveClass('Checked');
        const checkbox = within(label2).getByRole('checkbox');
        expect(checkbox).toBeChecked();
      });
    });
  });

  test('3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(drinkPathString);
    });

    expect(await screen.findByRole('heading', { name: /kir/i })).toBeInTheDocument();

    await waitFor(() => {
      drinkStepsArray.forEach((_step, index) => {
        const label3 = screen.getByTestId(`${index}-ingredient-step`);
        const checkbox = within(label3).getByRole('checkbox');
        userEvent.click(checkbox);
      });
    });

    const finishBtn = await screen.findByRole('button', { name: 'Finish Recipe' });
    expect(finishBtn).toBeInTheDocument();

    userEvent.click(finishBtn);
  });

  test('4', async () => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(drinkPathString);
    });

    expect(await screen.findByRole('heading', { name: /kir/i })).toBeInTheDocument();

    const share = await screen.findByTestId('share-btn');
    expect(share).toBeInTheDocument();

    userEvent.click(share);

    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
});
