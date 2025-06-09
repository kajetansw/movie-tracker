import { useGetFavoriteMoviesQuery } from "@/store/services/movies";
import { MovieItem } from "@/components/MovieItem/MovieItem";
import { isEmpty } from "lodash";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { CircleX, Star } from "lucide-react";
import { LoadingState } from "@/components/LoadingState/LoadingState";

import "./FavoritesPage.scss";

export const FavoritesPage = () => {
  const favoriteMovies = useGetFavoriteMoviesQuery();

  if (favoriteMovies.isError) {
    return (
      <EmptyState
        text="Error while fetching favorite movies. Please try again later."
        icon={CircleX}
      />
    );
  }

  if (favoriteMovies.isFetching) {
    return <LoadingState text="Loading favorites..." />;
  }

  if (isEmpty(favoriteMovies.data?.results)) {
    return <EmptyState text="No favorites added" icon={Star} />;
  }

  return (
    <ul className="favortesPage__list">
      {favoriteMovies.data?.results.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};
