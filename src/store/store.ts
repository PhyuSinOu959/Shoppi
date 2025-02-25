import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cartReducer from '@/src/store/Reducer/cartSlice';
import productReducer from '@/src/store/Reducer/productSlice';
import authReducer from '@/src/store/Reducer/authSlice';
import { rootSaga } from '@/src/store/saga';
import { categoryApi } from '@/src/services/api/category';
import { productApi } from '@/src/services/api/product';
import { measurementApi } from '@/src/services/api/measurement';
import { authApi } from '@/src/services/api/auth';

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