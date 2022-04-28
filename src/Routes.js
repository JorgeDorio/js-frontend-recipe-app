import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinkDetails from './pages/DrinkDetails';
import DrinksInProgress from './pages/DrinksInProgress';
import Explore from './pages/Explore';
import FoodsExplore from './pages/FoodsExplore';
import DrinksExplore from './pages/DrinksExplore';
import FoodsIngredients from './pages/FoodsIngredients';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsNationalities from './pages/FoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods:id" component={ FoodDetails } />
        <Route exact path="/foods/id/in-progress" component={ FoodsInProgress } />
        <Route exact path="/drinks:id" component={ DrinkDetails } />
        <Route exact path="/drinks/id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ FoodsExplore } />
        <Route exact path="/explore/drinks" component={ DrinksExplore } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    );
  }
}

export default Routes;
