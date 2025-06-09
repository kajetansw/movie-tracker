import type { Movie, MovieCredits, MovieDetails } from "@/models/movie";

export interface GetMoviesByQueryResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type GetMovieDetailsByMovieIdResult = MovieDetails;

export type GetMovieCreditsByMovieIdResult = MovieCredits;

export type AddMovieToFavoritesResult = {
  status_code: number;
  status_message: string;
};
