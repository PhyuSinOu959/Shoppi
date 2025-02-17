import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../endpoints';
import { Product } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://' 
  }),
  endpoints: (builder) => ({
    getPagedProducts: builder.query<Product[], void>({
      query: () => endpoints.product.getPagedListProduct,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `${endpoints.product.getProductById}/${id}`,
    }),
    getProductList: builder.query<Product[], void>({
      query: () => endpoints.category.getListProduct,
    }),
  }),
});

export const {
  useGetPagedProductsQuery,
  useGetProductQuery,
  useGetProductListQuery,
} = productApi; 