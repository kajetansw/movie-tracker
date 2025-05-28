import { useDispatch, useSelector } from "react-redux";
import { filtersActions, filtersSelectors } from "@/store/features/filters/filtersSlice";

import "./SearchBar.scss";

export const SearchBar = () => {
  const searchQuery = useSelector(filtersSelectors.selectQuery);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <input
        className="searchInput"
        type="text"
        placeholder="Search for movies..."
        aria-label="Search for movies..."
        value={searchQuery}
        onChange={(e) => {
          dispatch(filtersActions.setQuery(e.target.value));
        }}
      />
    </div>
  );
};
