import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mealPathString = '/meals/52977/in-progress';
const stepsArray = ['1 cup of Lentils',
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

// const drinkPathString = '/drinks/15997/in-progress';

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

    stepsArray.forEach(async (step) => {
      expect(await screen.findByRole('listitem', { name: step })).toBeInTheDocument();
    });
  });
});
