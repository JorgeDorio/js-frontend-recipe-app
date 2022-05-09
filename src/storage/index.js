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

export const getInProgress = () => (
  JSON.parse(localStorage.getItem('inProgressRecipes'))
);

export const getProgress = () => {
  const localStorageProgress = localStorage.getItem('progress');
  return JSON.parse(localStorageProgress) || [];
};

export const setProgress = (progress) => {
  const currentProgress = progress;
  localStorage.setItem('progress', JSON.stringify(currentProgress));
};

export const setDoneRecipe = (recipe) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  doneRecipes.push(recipe);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};
