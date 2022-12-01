export const GET_EMAIL = 'GET_EMAIL';
export const GET_RECIPES = 'GET_RECIPES';

export const getEmail = (userEmail) => ({
  type: GET_EMAIL,
  userEmail,
});

export const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

export const thunkToRenderMealsRecipes = () => async (dispatch) => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(url);
    const { meals } = await request.json();
    dispatch(getRecipes(meals));
  } catch (error) {
    throw new Error(error);
  }
};

export const thunkToRenderDrinksRecipes = () => async (dispatch) => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(url);
    const { drinks } = await request.json();
    dispatch(getRecipes(drinks));
  } catch (error) {
    throw new Error(error);
  }
};
