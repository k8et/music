import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApiCountry = createApi({
    reducerPath: "myApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam-api6.p.rapidapi.com/shazam/",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843");
            headers.set("X-RapidAPI-Host", "shazam-api6.p.rapidapi.com");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSongsByCountry: builder.query({
            query: (params) => ({
                url: 'top_tracks_city',
                params,
            }),
        }),
    }),
});

export const {
    useGetSongsByCountryQuery,
} = myApiCountry;
