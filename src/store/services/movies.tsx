import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AddMovieToFavoritesResult,
  GetMovieCreditsByMovieIdResult,
  GetMovieDetailsByMovieIdResult,
  GetMoviesByQueryResult,
} from "./types";
import invariant from "tiny-invariant";
import type { RootState } from "../store";

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  tagTypes: ["FavoriteMovies"],
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
    getFavoriteMovies: builder.query<GetMoviesByQueryResult, void>({
      query: () => `/account/${ACCOUNT_ID}/favorite/movies`,
      providesTags: ["FavoriteMovies"],
    }),
    addMovieToFavorites: builder.mutation<
      AddMovieToFavoritesResult,
      { movieId: string; favorite: boolean }
    >({
      query: ({ favorite, movieId }) => ({
        url: `/account/${ACCOUNT_ID}/favorite`,
        method: "POST",
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite,
        },
      }),
      invalidatesTags: ["FavoriteMovies"],
    }),
  }),
});

export const moviesApiSelectors = {
  favoriteMoviesIds: (state: RootState) => {
    const favoriteMovies =
      moviesApi.endpoints.getFavoriteMovies.select()(state);
    return favoriteMovies.data?.results.map((movie) => movie.id) ?? [];
  },
};

export const {
  useGetMoviesByQueryQuery,
  useGetMovieDetailsByMovieIdQuery,
  useGetMovieCreditsByMovieIdQuery,
  useAddMovieToFavoritesMutation,
  useGetFavoriteMoviesQuery,
} = moviesApi;
