export const ingredientFetch = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const nameFetch = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const firstLetterFetch = async (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const drinkIngredientFetch = async (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const drinkNameFetch = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const drinkFirstLetterFetch = async (firstLetter) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};
