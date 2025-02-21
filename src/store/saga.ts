import { all, fork } from 'redux-saga/effects'
import { productSaga } from './Saga/productSaga'

export function* rootSaga() {
    yield all([
        fork(productSaga),
    ])
}