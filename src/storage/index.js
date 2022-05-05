export const setTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const setStorageEmail = (userEmail) => {
  const user = { email: userEmail };
  localStorage.setItem('user', JSON.stringify(user));
};

export const getStorageEmail = () => {
  const data = JSON.parse(localStorage.getItem('user')) || '';
  return data;
};

export const getFavoriteRecipe = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes'))
);
