import { useGetMovieDetailsByMovieIdQuery } from "@/store/services/movies";
import { MovieItem } from "@/components/MovieItem/MovieItem";
import { useSelector } from "react-redux";
import { favoritesSelectors } from "@/store/features/favorites/favoritesSlice";
import { isEmpty } from "lodash";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Star } from "lucide-react";

import "./FavoritesPage.scss";

export const FavoritesPage = () => {
  const favoritesIds = useSelector(favoritesSelectors.ids);

  if (isEmpty(favoritesIds)) {
    return <EmptyState text="No favorites added" icon={Star} />;
  }

  return (
    <ul className="favortesPage__list">
      {favoritesIds.map((id) => (
        <FavoriteItem key={id} movieId={String(id)} />
      ))}
    </ul>
  );
};

const FavoriteItem = ({ movieId }: { movieId: string }) => {
  const movie = useGetMovieDetailsByMovieIdQuery(movieId);

  if (!movie.currentData) {
    return <FavoriteItemSkeleton />;
  }

  return <MovieItem movie={movie.currentData} />;
};

const FavoriteItemSkeleton = () => {
  return <li className="favoriteItemSkeleton"></li>;
};
