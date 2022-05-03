import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApiProvider from './context/ApiProvider';
import NationalitiesProvider from './context/NationalitesProvider';

ReactDOM.render(
  <BrowserRouter>
    <NationalitiesProvider>
      <ApiProvider>
        <Provider>
          <App />
        </Provider>
      </ApiProvider>
    </NationalitiesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
