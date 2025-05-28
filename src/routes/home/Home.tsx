import { useGetMoviesByQueryQuery } from "@/store/services/movies";
import "./Home.scss";

export default function Home() {
  const { data } = useGetMoviesByQueryQuery({
    page: 1,
    query: "blade",
  });

  console.log(data);

  return (
    <>
      <div className="text">TODO</div>
    </>
  );
}
