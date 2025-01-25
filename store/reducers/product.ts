import { createReducer } from '@reduxjs/toolkit';
import { setProductDetail } from '../actions/product';

export type ProductState = {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    rating?: number;
    soldCount?: number;
  } | null;
};

const initialState: ProductState = {
  product: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProductDetail, (state, action) => {
    state.product = action.payload;
  });
}); 