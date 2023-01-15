export const GET_EMAIL = 'GET_EMAIL';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_RECOMENDATIONS = 'GET_RECOMENDATIONS';
export const GET_CURRENT_STEPS = 'GET_CURRENT_STEPS';
export const GET_CURRENT_FAVORITES = 'GET_CURRENT_FAVORITES';
export const LOADING = 'LOADING';

export const getEmail = (userEmail) => ({
  type: GET_EMAIL,
  userEmail,
});

export const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const getRecipeDetails = (details) => ({
  type: GET_RECIPE_DETAILS,
  details,
});

export const getRecomendations = (recomendations) => ({
  type: GET_RECOMENDATIONS,
  recomendations,
});

export const getCurrentSteps = (currentSteps) => ({
  type: GET_CURRENT_STEPS,
  currentSteps,
});

export const getCurrentFavorites = (currentFavorites) => ({
  type: GET_CURRENT_FAVORITES,
  currentFavorites,
});

export const loading = (load) => ({
  type: LOADING,
  load,
});

export const thunkToRenderMealsRecipes = () => async (dispatch) => {
  // try {
  dispatch(loading(true));
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { meals } = await request.json();
  dispatch(loading(false));
  dispatch(getRecipes(meals));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToRenderDrinksRecipes = () => async (dispatch) => {
  // try {
  dispatch(loading(true));
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { drinks } = await request.json();
  dispatch(loading(false));
  dispatch(getRecipes(drinks));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToRenderMealsCategories = () => async (dispatch) => {
  // try {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const { meals } = await request.json();
  dispatch(getCategories(meals));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToRenderDrinksCategories = () => async (dispatch) => {
  // try {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const { drinks } = await request.json();
  dispatch(getCategories(drinks));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToFilterMealsCategories = (category) => async (dispatch) => {
  // try {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  dispatch(getRecipes(meals));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToFilterDrinksCategories = (category) => async (dispatch) => {
  // try {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  dispatch(getRecipes(drinks));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToMealDetails = (id) => async (dispatch) => {
  // try {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  dispatch(getRecipeDetails(meals));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToDrinkDetails = (id) => async (dispatch) => {
  // try {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  dispatch(getRecipeDetails(drinks));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToMealRecomendations = () => async (dispatch) => {
  // try {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { meals } = await request.json();
  dispatch(getRecomendations(meals));
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export const thunkToDrinkRecomendations = () => async (dispatch) => {
  // try {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { drinks } = await request.json();
  dispatch(getRecomendations(drinks));
  // } catch (error) {
  //   throw new Error(error);
  // }
};
