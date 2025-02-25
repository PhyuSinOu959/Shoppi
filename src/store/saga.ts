import { all, fork } from 'redux-saga/effects'
import { productSaga } from '@/src/store/Saga/productSaga'

export function* rootSaga() {
    yield all([
        fork(productSaga),
    ])
}