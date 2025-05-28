import { SearchBar } from "./components/SearchBar/SearchBar";
import { MoviesList } from "./components/MoviesList/MoviesList";

import "./Home.scss";

export default function HomePage() {
  return (
    <main className="home__container">
      <SearchBar />

      <section>
        <MoviesList />
      </section>
    </main>
  );
}
