import { useMoviesDetailsByMoviesIdsQueries } from "@/store/services/movies";
import { MovieItem } from "@/components/MovieItem/MovieItem";
import { useSelector } from "react-redux";
import { favoritesSelectors } from "@/store/features/favorites/favoritesSlice";
import { isEmpty } from "lodash";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { CircleX, Star } from "lucide-react";
import { QueryStatus } from "@reduxjs/toolkit/query";

import "./FavoritesPage.scss";

export const FavoritesPage = () => {
  const favoritesIds = useSelector(favoritesSelectors.ids);

  const movies = useMoviesDetailsByMoviesIdsQueries(
    favoritesIds.map((id) => String(id)),
  );

  if (isEmpty(favoritesIds)) {
    return <EmptyState text="No favorites added" icon={Star} />;
  }

  if (movies.some((m) => m.isError)) {
    return (
      <EmptyState
        text="Error while fetching favorite movies. Please try again later."
        icon={CircleX}
      />
    );
  }

  if (movies.some((m) => isFetching(m.status))) {
    return (
      <ul className="favortesPage__list">
        {favoritesIds.map((id) => (
          <FavoriteItemSkeleton key={id} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="favortesPage__list">
      {movies.map((movie) => (
        <MovieItem movie={movie.data!} key={movie.data!.id} />
      ))}
    </ul>
  );
};

const FavoriteItemSkeleton = () => {
  return <li className="favoriteItemSkeleton"></li>;
};

const isFetching = (status: QueryStatus) =>
  [QueryStatus.uninitialized, QueryStatus.pending].includes(status);
