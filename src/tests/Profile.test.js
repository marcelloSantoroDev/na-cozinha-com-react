import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('1', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  act(() => {
    history.push('/profile');
  });

  expect(await screen.findByRole('img', { name: /profile icon/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /profile/i })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /done recipes/i })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /favorite recipes/i })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: /logout/i })).toBeInTheDocument();
});

test('2', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  act(() => {
    history.push('/profile');
  });

  const doneRecipes = await screen.findByRole('button', { name: /done recipes/i });
  userEvent.click(doneRecipes);

  expect(history.location.pathname).toBe('/done-recipes');
});

test('3', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  act(() => {
    history.push('/profile');
  });

  const favoriteRecipes = await screen.findByRole('button', { name: /favorite recipes/i });
  userEvent.click(favoriteRecipes);

  expect(history.location.pathname).toBe('/favorite-recipes');
});

test('4', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  act(() => {
    history.push('/profile');
  });

  const logout = await screen.findByRole('button', { name: /logout/i });
  userEvent.click(logout);

  expect(history.location.pathname).toBe('/');
});

//
