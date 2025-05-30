import type { Movie } from "@/models/movie";
import { Link } from "react-router";
import { MovieTitle } from "@/components/MovieTitle/MovieTitle";
import { getYear } from "@/utils/getYear";
import { MovieVote } from "@/components/MovieVote/MovieVote";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  favoritesActions,
  favoritesSelectors,
} from "@/store/features/favorites/favoritesSlice";
import { SELECTORS } from "@/constants/testSelectors";

import "./MovieItem.scss";

interface Props {
  movie: Pick<
    Movie,
    | "poster_path"
    | "id"
    | "title"
    | "release_date"
    | "vote_average"
    | "vote_count"
    | "overview"
  >;
}

const POSTER_URL = "https://image.tmdb.org/t/p/w200";

export const MovieItem = ({ movie }: Props) => {
  const favoritesIds = useSelector(favoritesSelectors.ids);
  const isFavorite = favoritesIds.includes(movie.id);

  const dispatch = useDispatch();

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
          alt={`Poster for ${movie.title}`}
          data-test={`${SELECTORS.movieItem.poster}-${movie.id}`}
        />

        <div className="info">
          <div className="infoHeader">
            <MovieTitle
              title={movie.title}
              year={getYear(movie.release_date)}
            />
            <button
              className="favoriteButton"
              title="Add to favorites"
              onClick={(e) => {
                e.preventDefault();
                dispatch(favoritesActions.toggle(movie.id));
              }}
              data-test={`${SELECTORS.movieItem.favoriteBtn}-${isFavorite ? "on" : "off"}-${movie.id}`}
            >
              <Star {...(isFavorite ? { fill: "#8a6bc1" } : {})} />
            </button>
          </div>

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
