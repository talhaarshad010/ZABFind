import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import {BaseUrl} from '../../config/Urls';

export const Auth = createApi({
  reducerPath: 'Authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().Auth.token;
      console.log('Token in Auth API:', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
    completeProfile: builder.mutation({
      query: profileData => ({
        url: '/student/complete-profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useCompleteProfileMutation,
} = Auth;
