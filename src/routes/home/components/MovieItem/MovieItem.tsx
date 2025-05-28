import type { Movie } from "@/models/movie";
import { Link } from "react-router";
import { MovieTitle } from "@/components/MovieTitle/MovieTitle";
import { getYear } from "@/utils/getYear";
import { MovieVote } from "@/components/MovieVote/MovieVote";

import "./MovieItem.scss";

interface Props {
  movie: Movie;
}

const POSTER_URL = "https://image.tmdb.org/t/p/w200";

export const MovieItem = ({ movie }: Props) => {
  return (
    <li className="movieItem__container" key={movie.id}>
      <Link className="listItem" to={`/details/${movie.id}`}>
        <img
          className="poster"
          src={
            movie.poster_path
              ? `${POSTER_URL}/${movie.poster_path}`
              : "https://placehold.co/200x300?text=No+poster"
          }
          alt=""
        />

        <div className="info">
          <MovieTitle title={movie.title} year={getYear(movie.release_date)} />

          <MovieVote average={movie.vote_average} count={movie.vote_count} />

          <p className="overview">{trimOverview(movie.overview)}</p>
        </div>
      </Link>
    </li>
  );
};

/*
 * utils
 */

const trimOverview = (overview: string) => {
  const maxLength = 150;
  return overview.length <= maxLength
    ? overview
    : overview.substring(0, maxLength) + "...";
};
