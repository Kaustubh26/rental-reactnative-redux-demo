// Redux Store Configuration
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';


const saveSubsetBlacklistFilter = createBlacklistFilter(
  'auth',
  ['loginErrorMsg', 'registerErrorMsg', 'registerEmail', 'verMailSent']
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [saveSubsetBlacklistFilter],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {},
  compose(
        applyMiddleware(thunk),
    ));

persistStore(store);

export default store;

