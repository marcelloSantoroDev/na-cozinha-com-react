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
