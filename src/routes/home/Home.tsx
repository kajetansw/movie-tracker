import { useGetMoviesByQueryQuery } from "@/store/services/movies";
import { SearchBar } from "./components/SearchBar/SearchBar";

import "./Home.scss";

export default function Home() {
  const { data } = useGetMoviesByQueryQuery({
    page: 1,
    query: "blade",
  });

  console.log(data);

  return (
    <>
      <SearchBar></SearchBar>
    </>
  );
}
