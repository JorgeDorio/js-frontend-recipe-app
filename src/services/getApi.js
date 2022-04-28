export const getCategories = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const getMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getCategoriesDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getMealsByCategory = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getDrinksByCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};
