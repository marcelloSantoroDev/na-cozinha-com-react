import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const localStorageArray = [
  { id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' },
  { id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
];

describe('Testes da tela "FavoriteRecipes.js":', () => {
  test('1), verifica elementos renderizados:', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });

    expect(await screen.findByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();

    expect(await screen.findByText('Corba')).toBeInTheDocument();
    expect(await screen.findByText('GG')).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: /all/i }));
    userEvent.click(await screen.findByRole('button', { name: /meals/i }));
    userEvent.click(await screen.findByRole('button', { name: /drinks/i }));
  });
});
