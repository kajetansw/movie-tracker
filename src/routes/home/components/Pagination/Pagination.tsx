import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  filtersActions,
  filtersSelectors,
} from "@/store/features/filters/filtersSlice";
import cn from "classnames";

import "./Pagination.scss";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const searchPage = useSelector(filtersSelectors.selectPage);
  const dispatch = useDispatch();

  const increment = () => dispatch(filtersActions.setPage(searchPage + 1));
  const decrement = () => dispatch(filtersActions.setPage(searchPage - 1));

  return (
    <div className="pagination__container">
      <button className="button" disabled={searchPage <= 1} onClick={decrement}>
        <ChevronLeft size={20} />
      </button>

      <div className="pagesContainer">
        {getPageSpan(totalPages, searchPage).map((page) => (
          <button
            key={page}
            className={cn("button", {
              active: page === searchPage,
            })}
            onClick={() => dispatch(filtersActions.setPage(page))}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="button"
        disabled={searchPage >= totalPages}
        onClick={increment}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

/*
 * utils
 */

const getPageSpan = (total: number, current: number): number[] => {
  const range = Array(total)
    .fill(null)
    .map((_, idx) => idx + 1);
  const spanLength = 5;

  if (current > total - spanLength) {
    return range.slice(total - spanLength);
  }
  return range.slice(current - 1, current + spanLength - 1);
};
