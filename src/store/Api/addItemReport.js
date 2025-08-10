import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import {BaseUrl} from '../../config/Urls';

export const ItemReports = createApi({
  reducerPath: 'AddReport',
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
    AddReport: builder.mutation({
      query: credentials => ({
        url: '/student/report-item',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useAddReportMutation} = ItemReports;
