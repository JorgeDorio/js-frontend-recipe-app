// a listagem de todas as nacionalidades para o dropdown;
export const getMealsNationalities = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

// Requisita a imagem e titulo das comidas por nacionalidades;
export const fetchMealsByNationalities = async (query) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`;
    const request = await fetch(url);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};
