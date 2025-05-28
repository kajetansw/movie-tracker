import { SearchBar } from "./components/SearchBar/SearchBar";
import { MoviesList } from "./components/MoviesList/MoviesList";

import "./Home.scss";

export default function Home() {
  return (
    <>
      <SearchBar />
      <MoviesList />
    </>
  );
}
