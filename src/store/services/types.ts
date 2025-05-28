import type { Movie, MovieDetails } from "@/models/movie";

export interface GetMoviesByQueryResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type GetMovieDetailsByMovieIdResult = MovieDetails;
