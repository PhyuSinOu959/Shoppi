import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../endpoints';
import { ProductMeasurement } from '../types/productMeasurement';

export const measurementApi = createApi({
  reducerPath: 'measurementApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://' 
  }),
  endpoints: (builder) => ({
    getProductMeasurements: builder.query<ProductMeasurement[], void>({
      query: () => endpoints.productMeasure.getListProdtMeasure,
    }),
    getProductMeasurement: builder.query<ProductMeasurement, string>({
      query: (id) => `${endpoints.productMeasure.getListProdMeasureById}/${id}`,
    }),
  }),
});

export const {
  useGetProductMeasurementsQuery,
  useGetProductMeasurementQuery,
} = measurementApi; 