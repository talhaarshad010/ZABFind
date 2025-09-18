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
    forgotPassword: builder.mutation({
      query: emailAddress => ({
        url: '/common/forgot-password',
        method: 'POST',
        body: {emailAddress},
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({email, otp}) => ({
        url: '/common/verify-otp',
        method: 'POST',
        body: {email, otp},
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email, otp, newPassword}) => ({
        url: '/common/reset-password',
        method: 'POST',
        body: {email, otp, newPassword},
      }),
    }),

    completeProfile: builder.mutation({
      query: profileData => ({
        url: '/student/complete-profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
    getStudentById: builder.query({
      query: id => ({
        url: `/student/${id}`,
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: formData => ({
        url: '/common/update-profile',
        method: 'PUT',
        body: formData,
      }),
    }),
    getLostFoundItems: builder.query({
      query: () => ({
        url: '/common/get-items',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useCompleteProfileMutation,
  useGetStudentByIdQuery,
  useUpdateProfileMutation,
  useGetLostFoundItemsQuery,
} = Auth;
