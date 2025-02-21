import { createAction } from '@reduxjs/toolkit';

export const getProductDetail = createAction<string>('product/getProductDetail');
export const setProductDetail = createAction<any>('product/setProductDetail'); 