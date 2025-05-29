import { SearchBar } from "./components/SearchBar/SearchBar";
import { MoviesList } from "./components/MoviesList/MoviesList";
import { useGetMoviesByQueryQuery } from "@/store/services/movies";
import { useSelector } from "react-redux";
import { filtersSelectors } from "@/store/features/filters/filtersSlice";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import { isEmpty } from "lodash";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { SearchX } from "lucide-react";

import "./Home.scss";

export default function HomePage() {
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

  return (
    <main className="home__container">
      <SearchBar />

      <section>
        {movies.isFetching && <LoadingState text="Loading movies..." />}

        {movies.currentData && isEmpty(movies.currentData.results) && (
          <EmptyState
            text="No movies found. Try a different search query."
            icon={SearchX}
          />
        )}

        {movies.currentData && (
          <MoviesList
            movies={movies.currentData.results}
            totalPages={movies.currentData.total_pages}
          />
        )}
      </section>
    </main>
  );
}
