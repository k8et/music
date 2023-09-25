import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843",
      );
      headers.set("X-RapidAPI-Host", "shazam-core7.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (id) => `songs/list-recommendations?id=${id}&limit=5`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=9`,
    }),
    getSongsByCountry: builder.query({
      query: (country) => `URL_ДЛЯ_ПЕСЕН_ПО_СТРАНЕ?country=${country}&limit=10`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `URL_ДЛЯ_ПЕСЕН_ПО_ПОИСКУ?term=${searchTerm}&limit=10`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artist/get-top-songs?id=${artistId}`,
    }),

    getSongDetails: builder.query({
      query: (songId) => `URL_ДЛЯ_ИНФОРМАЦИИ_О_ПЕСНЕ/${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `URL_ДЛЯ_СВЯЗАННЫХ_ПЕСЕН/${songId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = myApi;
