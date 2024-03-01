import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843");
      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (params) => ({
        url: 'charts/track',
        params,
      }),
    }),
    getSongsByRecommendation: builder.query({
      query: (params) => ({
        url: 'songs/list-recommendations',
        params,
      }),
    }),
    getSongsBySearch: builder.query({
      query: (params) => ({
        url: 'search',
        params,
      }),
    }),
    getArtistDetails: builder.query({
      query: (params) => ({
        url: 'artists/get-top-songs',
        params,
      }),
    }),
    getSongDetails: builder.query({
      query: (params) => ({
        url: 'songs/get-details',
        params,
      }),
    }),
    getSongRelated: builder.query({
      query: (songId) => `URL_ДЛЯ_СВЯЗАННЫХ_ПЕСЕН/${songId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByRecommendationQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
} = myApi;
