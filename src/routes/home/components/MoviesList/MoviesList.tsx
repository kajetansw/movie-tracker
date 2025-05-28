import { useGetMoviesByQueryQuery } from "@/store/services/movies";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { filtersSelectors } from "@/store/features/filters/filtersSlice";
import { EmptyState } from "../EmptyState/EmptyState";
import { SearchX } from "lucide-react";

import "./MoviesList.scss";

export const MoviesList = () => {
  const searchQuery = useSelector(filtersSelectors.selectQuery);

  const movies = useGetMoviesByQueryQuery(
    {
      page: 1,
      query: searchQuery,
    },
    {
      skip: !searchQuery,
    },
  );

  if (movies.isUninitialized) {
    // TODO implement Idle state
    return <div>Type your phrase</div>;
  }

  if (movies.isFetching) {
    // TODO implement loading state
    return <div>Loading...</div>;
  }

  if (isEmpty(movies.data?.results)) {
    // TODO implement No Results state
    return <EmptyState text="No results!" icon={SearchX}></EmptyState>;
  }

  return (
    <ul>
      {movies.data?.results.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};
