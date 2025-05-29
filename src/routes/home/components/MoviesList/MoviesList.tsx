import { MovieItem } from "../MovieItem/MovieItem";
import { Pagination } from "../Pagination/Pagination";
import type { Movie } from "@/models/movie";
import { isEmpty, isNil } from "lodash";

import "./MoviesList.scss";

interface Props {
  movies: Movie[];
  totalPages?: number;
}

export const MoviesList = ({ movies, totalPages }: Props) => {
  return (
    <>
      <ul className="moviesList__list">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>

      {!isNil(totalPages) && !isEmpty(movies) && (
        <Pagination totalPages={totalPages} />
      )}
    </>
  );
};
