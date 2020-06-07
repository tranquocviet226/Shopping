import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'

import productReducer from './src/store/reducers/product';
import ShopNavigator from './src/navigation/ShopNavigator';
import cartReducer from './src/store/reducers/cart';
import orderReducer from './src/store/reducers/order';
import authReducer from './src/store/reducers/auth';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
