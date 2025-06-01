import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetMovieCreditsByMovieIdResult,
  GetMovieDetailsByMovieIdResult,
  GetMoviesByQueryResult,
} from "./types";
import invariant from "tiny-invariant";
import { useQueries } from "../useQueries";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      const apiToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

      invariant(
        apiToken,
        "You should provide env variable for the TMDB access token. Check out .env.template file.",
      );

      headers.set("authorization", `Bearer ${apiToken}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMoviesByQuery: builder.query<
      GetMoviesByQueryResult,
      { query: string; includeAdult?: boolean; page: number }
    >({
      query: ({ query, includeAdult = false, page }) =>
        `search/movie?query=${query}&include_adult=${includeAdult}&language=en-US&page=${page}`,
    }),
    getMovieDetailsByMovieId: builder.query<
      GetMovieDetailsByMovieIdResult,
      string
    >({
      query: (movieId) => `movie/${movieId}`,
    }),
    getMovieCreditsByMovieId: builder.query<
      GetMovieCreditsByMovieIdResult,
      string
    >({
      query: (movieId) => `movie/${movieId}/credits`,
    }),
  }),
});

export const {
  useGetMoviesByQueryQuery,
  useGetMovieDetailsByMovieIdQuery,
  useGetMovieCreditsByMovieIdQuery,
} = moviesApi;

export const useMoviesDetailsByMoviesIdsQueries = useQueries(
  moviesApi.endpoints.getMovieDetailsByMovieId,
  {
    serializeArgs: (args) => args.join(","),
  },
);
