import { useParams } from "react-router";
import { MovieTitle } from "@/components/MovieTitle/MovieTitle";
import { getYear } from "@/utils/getYear";
import { MovieVote } from "@/components/MovieVote/MovieVote";
import { useMovieDetails } from "./hooks/useMovieDetails";
import { LoadingState } from "@/components/LoadingState/LoadingState";

import "./Details.scss";
import { isEmpty } from "lodash";

const POSTER_URL = "https://image.tmdb.org/t/p/w400";

export const DetailsPage = () => {
  const { movieId } = useParams();

  if (!movieId) {
    return null;
  }

  const {
    isFetching,
    movie: { details, credits },
  } = useMovieDetails(movieId);

  if (isFetching) {
    return <LoadingState text="Loading movie details..." />;
  }

  if (!details || !credits) {
    return null;
  }

  const director = credits.crew.find((c) => c.job === "Director");
  const stars = credits.cast.map((c) => c.name);

  return (
    <section className="details__container">
      <img
        className="poster"
        src={
          details.poster_path
            ? `${POSTER_URL}/${details.poster_path}`
            : "https://placehold.co/400x600?text=No+poster"
        }
        alt=""
      />

      <div className="info">
        <MovieTitle
          title={details.title}
          year={getYear(details.release_date)}
        />

        <MovieVote average={details.vote_average} count={details.vote_count} />

        {director?.name && (
          <p className="detail">{`Director: ${director.name}`}</p>
        )}

        {!isEmpty(stars) && (
          <p className="detail">{`Stars: ${stars.slice(0, 10).join(", ")}`}</p>
        )}

        <p>{details.overview}</p>
      </div>
    </section>
  );
};
