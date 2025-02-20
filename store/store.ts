import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cartReducer from './Reducer/cartSlice';
import productReducer from './Reducer/productSlice';
import authReducer from './Reducer/authSlice';
import { rootSaga } from './saga';
import { categoryApi } from '../services/api/category';
import { productApi } from '../services/api/product';
import { measurementApi } from '../services/api/measurement';
import { authApi } from '../services/api/auth';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [measurementApi.reducerPath]: measurementApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(measurementApi.middleware)
      .concat(authApi.middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;