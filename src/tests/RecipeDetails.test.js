import { findByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testes tela de detalhes - meals', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(await findByTestId('recipe-category')).toHaveTextContent('Side');
  });
});
