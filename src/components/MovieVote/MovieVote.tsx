import { StarHalf } from "lucide-react";
import { roundVote } from "@/utils/roundVote";

import "./MovieVote.scss";

interface Props {
  average: number | null;
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
