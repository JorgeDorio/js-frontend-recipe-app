const getCategories = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export default getCategories;
