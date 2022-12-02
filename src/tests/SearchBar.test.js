import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const stringInput = 'search-input';
const stringSearch = 'exec-search-btn';

describe('testes de meals', () => {
  test('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    expect(await screen.findByRole('heading', { level: 1, name: 'Meals' })).toBeInTheDocument();
  });

  test('2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'egg');

    const buttonRadioName = await screen.findByRole('radio', { name: /name/i });
    expect(buttonRadioName).toBeInTheDocument();
    userEvent.click(buttonRadioName);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText(/egg drop soup/i);
    expect(recipe).toBeInTheDocument();
  });

  test('3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'egg');

    const buttonRadioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    expect(buttonRadioIngredient).toBeInTheDocument();
    userEvent.click(buttonRadioIngredient);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText(/beef lo mein/i);
    expect(recipe).toBeInTheDocument();
  });

  test('4', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'e');

    const buttonRadioFirst = await screen.findByRole('radio', { name: /first letter/i });
    expect(buttonRadioFirst).toBeInTheDocument();
    userEvent.click(buttonRadioFirst);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText(/Eton Mess/i);
    expect(recipe).toBeInTheDocument();
  });

  test('5', async () => {
    global.alert = jest.fn(() => {});
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'easdasd');

    const buttonRadioFirst = await screen.findByRole('radio', { name: /first letter/i });
    expect(buttonRadioFirst).toBeInTheDocument();
    userEvent.click(buttonRadioFirst);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  test('6', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Arrabiata');

    const buttonRadioName = await screen.findByRole('radio', { name: /name/i });
    expect(buttonRadioName).toBeInTheDocument();
    userEvent.click(buttonRadioName);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });

  test('7', async () => {
    global.alert = jest.fn(() => {});
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'fetuccine');

    const buttonRadioName = await screen.findByRole('radio', { name: /name/i });
    userEvent.click(buttonRadioName);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});

describe('testes de drinks', () => {
  test('7', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'sherry');

    const buttonRadioName = await screen.findByRole('radio', { name: /name/i });
    expect(buttonRadioName).toBeInTheDocument();
    userEvent.click(buttonRadioName);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText('Sherry Flip');
    expect(recipe).toBeInTheDocument();
  });

  test('8', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'sherry');

    const buttonRadioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    expect(buttonRadioIngredient).toBeInTheDocument();
    userEvent.click(buttonRadioIngredient);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText('Adonis Cocktail');
    expect(recipe).toBeInTheDocument();
  });

  test('9', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'e');

    const buttonRadioFirst = await screen.findByRole('radio', { name: /first letter/i });
    expect(buttonRadioFirst).toBeInTheDocument();
    userEvent.click(buttonRadioFirst);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    const recipe = await screen.findByText('Egg Cream');
    expect(recipe).toBeInTheDocument();
  });

  test('10', async () => {
    global.alert = jest.fn(() => {});
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearchBar);

    const inputSearch = await screen.findByTestId(stringInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'easdasd');

    const buttonRadioFirst = await screen.findByRole('radio', { name: /first letter/i });
    expect(buttonRadioFirst).toBeInTheDocument();
    userEvent.click(buttonRadioFirst);

    const buttonSearch = await screen.findByTestId(stringSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  test('11', async () => {
    global.alert = jest.fn(() => {});

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');
    const buttonSearchBar = await screen.findByRole('img', { name: /search icon/i });
    const inputSearch = await screen.findByTestId(stringInput);
    const buttonRadioName = await screen.findByRole('radio', { name: /name/i });
    const buttonSearch = await screen.findByTestId(stringSearch);

    userEvent.click(buttonSearchBar);
    userEvent.type(inputSearch, 'lalala');
    userEvent.click(buttonRadioName);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
