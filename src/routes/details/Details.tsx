import { useGetMovieDetailsByMovieIdQuery } from "@/store/services/movies";
import { useParams } from "react-router";

export const DetailsPage = () => {
  const { movieId } = useParams();

  if (!movieId) {
    return null;
  }

  const movieDetails = useGetMovieDetailsByMovieIdQuery(movieId);

  console.log(movieDetails.data);

  return <div>TODO</div>;
};
