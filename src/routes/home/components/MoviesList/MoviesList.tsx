import { useGetMoviesByQueryQuery } from "@/store/services/movies";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { filtersSelectors } from "@/store/features/filters/filtersSlice";
import { EmptyState } from "../EmptyState/EmptyState";
import { SearchX } from "lucide-react";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import { MovieItem } from "../MovieItem/MovieItem";
import { Pagination } from "../Pagination/Pagination";

import "./MoviesList.scss";

export const MoviesList = () => {
  const searchQuery = useSelector(filtersSelectors.selectQuery);
  const searchPage = useSelector(filtersSelectors.selectPage);

  const movies = useGetMoviesByQueryQuery(
    {
      page: searchPage,
      query: searchQuery,
    },
    {
      skip: !searchQuery,
    },
  );

  if (movies.isUninitialized) {
    return null;
  }

  if (movies.isFetching) {
    return <LoadingState text="Loading movies..." />;
  }

  if (isEmpty(movies.data?.results)) {
    return (
      <EmptyState
        text="No movies found. Try a different search query."
        icon={SearchX}
      />
    );
  }

  return (
    <>
      <ul className="moviesList__list">
        {movies.data?.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>

      {movies.data?.total_pages && (
        <Pagination totalPages={movies.data.total_pages} />
      )}
    </>
  );
};
