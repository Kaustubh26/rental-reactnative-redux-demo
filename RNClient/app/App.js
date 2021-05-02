/**
 * React Native Client for Apartment Rental app.
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigation from "./navigation";

//const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;
