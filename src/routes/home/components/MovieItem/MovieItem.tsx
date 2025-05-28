import type { Movie } from "@/models/movie";

import "./MovieItem.scss";

interface Props {
  movie: Movie;
}

const POSTER_URL = "https://image.tmdb.org/t/p/w200";

export const MovieItem = ({ movie }: Props) => {
  return (
    <li className="movieItem__container" key={movie.id}>
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
        <div className="title">
          <h2 className="titleName">{movie.title}</h2>
          {movie.release_date && (
            <span className="year">{getYear(movie.release_date)}</span>
          )}
        </div>
      </div>
    </li>
  );
};

/*
 * utils
 */

const getYear = (releaseDate: string) => releaseDate.split("-")[0];
