import { StarHalf } from "lucide-react";

import "./MovieVote.scss";

interface Props {
  average: number;
  count: number;
}

export const MovieVote = ({ average, count }: Props) => {
  return (
    <div className="movieVote__container">
      <StarHalf />
      <p className="vote">
        {average ? (
          <>
            <span className="bold">{roundVote(average)}</span>
            {` / 10 (${count} votes)`}
          </>
        ) : (
          "No votes"
        )}
      </p>
    </div>
  );
};

/*
 * utils
 */

const roundVote = (vote: number) => Math.round(+vote * 10) / 10;
