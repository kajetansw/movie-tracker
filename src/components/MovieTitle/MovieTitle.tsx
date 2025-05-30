import { SELECTORS } from "../../constants/testSelectors";

import "./MovieTitle.scss";

interface Props {
  title: string;
  year: string;
}

export const MovieTitle = ({ title, year }: Props) => (
  <div className="movieTitle__title">
    <h2 className="titleName">{title}</h2>
    {year && (
      <span
        data-test={`${SELECTORS.movieTitle.year}-${title}-${year}`}
        className="year"
      >
        {year}
      </span>
    )}
  </div>
);
