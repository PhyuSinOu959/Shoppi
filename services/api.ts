import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from './endpoints';
import { Category } from './types/category';
import { Product } from './types/product';
import { ProductMeasurement } from './types/productMeasurement';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.xwinpos.store' 
  }),
  endpoints: (builder) => ({
    // Category endpoints
    getCategories: builder.query<Category[], void>({
      query: () => endpoints.category.getListCategory,
    }),
    getCategoriesWithProducts: builder.query<Category[], void>({
      query: () => endpoints.category.getListCategoryWithProduct,
    }),
    getCategoriesWithProductsAndFilter: builder.query<Category[], void>({
      query: () => endpoints.category.getListCateWithProduct_CateFilter,
    }),

    // Product endpoints
    getPagedProducts: builder.query<Product[], void>({
      query: () => endpoints.product.getPagedListProduct,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `${endpoints.product.getProductById}/${id}`,
    }),

    // Product Measurement endpoints
    getProductMeasurements: builder.query<ProductMeasurement[], void>({
      query: () => endpoints.productMeasure.getListProdtMeasure,
    }),
    getProductMeasurement: builder.query<ProductMeasurement, string>({
      query: (id) => `${endpoints.productMeasure.getListProdMeasureById}/${id}`,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCategoriesQuery,
  useGetCategoriesWithProductsQuery,
  useGetCategoriesWithProductsAndFilterQuery,
  useGetPagedProductsQuery,
  useGetProductQuery,
  useGetProductMeasurementsQuery,
  useGetProductMeasurementQuery,
} = api;