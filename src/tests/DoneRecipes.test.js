import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const localStorageArray = [{
  nationality: 'Turkish',
  category: 'Soup',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
}];

describe('testes de tela feitas', () => {
  test('1', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageArray));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/done-recipes');
    });

    expect(await screen.findByRole('heading', { name: /done recipes/i })).toBeInTheDocument();

    expect(await screen.findByText('Corba')).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: /all/i }));
    userEvent.click(await screen.findByRole('button', { name: /meals/i }));
    userEvent.click(await screen.findByRole('button', { name: /drinks/i }));
  });
});
