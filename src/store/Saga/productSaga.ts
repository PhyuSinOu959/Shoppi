import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { fetchProducts } from '@/src/services/api';
import { 
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../Reducer/productSlice';

function* fetchProductsSaga(): Generator<any, void, AxiosResponse> {
  try {
    const response = yield call(fetchProducts);
    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchProductsFailure(error?.message || 'Failed to fetch products'));
  }
}

export function* productSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
} 