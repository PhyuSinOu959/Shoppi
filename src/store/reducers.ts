import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './Reducer/homeSlice';

export const rootReducer = combineReducers({
    home: homeReducer,
});
