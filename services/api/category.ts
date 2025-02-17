import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../endpoints';
import { Category } from '../types/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://' 
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => endpoints.category.getListCategory,
    }),
    getCategoriesWithProducts: builder.query<Category[], void>({
      query: () => endpoints.category.getListCategoryWithProduct,
    }),
    getCategoriesWithProductsAndFilter: builder.query<Category[], void>({
      query: () => endpoints.category.getListCateWithProduct_CateFilter,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesWithProductsQuery,
  useGetCategoriesWithProductsAndFilterQuery,
} = categoryApi; 