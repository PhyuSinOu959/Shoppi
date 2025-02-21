
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getListCategory } from '../Reducer/homeSlice';
import { IResponseData } from '@/src/services/types';

export default function* homeSaga() {
    yield all([
        takeLatest(getListCategory.toString(), getListCategorySaga)
    ])
}

function* getListCategorySaga() {
    try {
        const res: IResponseData = yield call(getListCategory);
        if (res.result) {
            yield put(setCategoryList(res.result));
        }
    } catch (error) {
        console.warn('ouu', 'getCategoryList error', error);
    }
}