import { useGetMovieDetailsByMovieIdQuery } from "@/store/services/movies";
import { useParams } from "react-router";
import { MovieTitle } from "@/components/MovieTitle/MovieTitle";
import { getYear } from "@/utils/getYear";
import { MovieVote } from "@/components/MovieVote/MovieVote";

import "./Details.scss";

const POSTER_URL = "https://image.tmdb.org/t/p/w400";

export const DetailsPage = () => {
  const { movieId } = useParams();

  if (!movieId) {
    return null;
  }

  const { data: movie, isFetching } = useGetMovieDetailsByMovieIdQuery(movieId);

  if (isFetching) {
    // TOOD implement
    return <div>Loading...</div>;
  }

  if (!movie) {
    return null;
  }

  // TODO remove
  console.log(movie);

  return (
    <section className="details__container">
      <img
        className="poster"
        src={
          movie.poster_path
            ? `${POSTER_URL}/${movie.poster_path}`
            : "https://placehold.co/400x600?text=No+poster"
        }
        alt=""
      />

      <div className="info">
        <MovieTitle title={movie.title} year={getYear(movie.release_date)} />

        <MovieVote average={movie.vote_average} count={movie.vote_count} />

        <p className="director">{movie.overview}</p>
      </div>
    </section>
  );
};
