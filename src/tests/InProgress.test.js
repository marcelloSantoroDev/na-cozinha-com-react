import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mealPathString = '/meals/52977/in-progress';
const drinkPathString = '/drinks/15997/in-progress';

const mealStepsArray = ['1 cup of Lentils',
  '1 large of Onion',
  ' 1 large of Carrots',
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

const drinkStepsArray = ['2 1/2 shots of Galliano',
  'undefined of Ginger ale',
  'undefined of Ice',
];

describe('testes tela inProgress - meals', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(mealPathString);
    });
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole(('heading', { name: /category: side/i }))).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();

    mealStepsArray.forEach(async (step) => {
      expect(await screen.findByRole('listitem', { name: step })).toBeInTheDocument();
    });
  });
});

describe('testes tela inProgress - drinks', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(drinkPathString);
    });
    expect(await screen.findByRole('heading', { name: /GG/i })).toBeInTheDocument();
    expect(await screen.findByRole(('heading', { name: /Category: Ordinary Drink, Optional alcohol/i }))).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();

    drinkStepsArray.forEach(async (step) => {
      expect(await screen.findByRole('listitem', { name: step })).toBeInTheDocument();
    });
  });
});
