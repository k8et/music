import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://music-server-production.up.railway.app/api/",
  }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: (limit = 10) => `all-data?limit=${limit}`,
    }),
    getTracks: builder.query({
      query: (limit = 10) => `tracks?limit=${limit}`,
    }),
  }),
});

export const {
  useGetAllDataQuery,
  useGetTracksQuery,
} = myApi;
