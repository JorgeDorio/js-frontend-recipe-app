export const ingredientsApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const ingredientsDrinksApi = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};
