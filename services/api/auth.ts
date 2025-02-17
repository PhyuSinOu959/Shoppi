import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../endpoints';
import { User } from '../types/user';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state and add to headers if it exists
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: endpoints.auth.register,
        method: 'POST',
        body: userData,
      }),
    }),
    verifyToken: builder.query<User, void>({
      query: () => endpoints.auth.verifyToken,
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: endpoints.auth.logout,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useLogoutMutation,
} = authApi; 