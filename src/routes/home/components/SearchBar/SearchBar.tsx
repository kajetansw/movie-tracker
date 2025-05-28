import { useDispatch, useSelector } from "react-redux";
import { filtersActions, filtersSelectors } from "@/store/features/filters/filtersSlice";
import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

import "./SearchBar.scss";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const searchQuery = useSelector(filtersSelectors.selectQuery);
  const dispatch = useDispatch();

  const setSearchQuery = useCallback(
    debounce((query: string) => {
      dispatch(filtersActions.setQuery(query));
    }, 500),
    [],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchQuery;
    }
  }, []);

  return (
    <div className="container">
      <input
        className="searchInput"
        ref={inputRef}
        type="text"
        placeholder="Search for movies..."
        aria-label="Search for movies..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
