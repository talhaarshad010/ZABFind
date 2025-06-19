import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import {BaseUrl} from '../../config/Urls';

export const Auth = createApi({
  reducerPath: 'Authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: credentials => ({
        url: '/student/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation({
      query: credentials => ({
        url: '/common/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useSignInMutation, useSignUpMutation} = Auth;
