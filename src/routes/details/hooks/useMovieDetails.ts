import {
  useGetMovieCreditsByMovieIdQuery,
  useGetMovieDetailsByMovieIdQuery,
} from "@/store/services/movies";

export const useMovieDetails = (movieId: string) => {
  const details = useGetMovieDetailsByMovieIdQuery(movieId);
  const credits = useGetMovieCreditsByMovieIdQuery(movieId);

  return {
    isFetching: details.isFetching || credits.isFetching,
    movie: {
      details: details.data,
      credits: credits.data,
    },
  };
};
