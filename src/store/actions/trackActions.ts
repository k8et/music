import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "d2a5c0eb10msh16f501bbec72bfep1bd565jsn3fc8e2e4fe34",
      );
      headers.set("X-RapidAPI-Host", "shazam-core7.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (id) => `songs/list-recommendations?id=${id}&limit=12`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=12`,
    }),
    getSongsByCountry: builder.query({
      query: (country) =>
        `charts/get-top-songs-in-country?country_code=${country}&limit=12`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?term=${searchTerm}&limit=12`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artist/get-top-songs?id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `songs/get_details?id=${songId}`,
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
} = myApi;
