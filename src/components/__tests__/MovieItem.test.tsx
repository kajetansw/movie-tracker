import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MovieItem } from "../MovieItem/MovieItem";
import { getYear } from "@/utils/getYear";
import { queryByTestIdStartingWith, renderWithProviders } from "@/test/helpers";
import { SELECTORS } from "@/constants/testSelectors";

const mockMovie = {
  id: 1,
  title: "Test Movie",
  release_date: "2023-01-01",
  poster_path: "test-poster.jpg",
  vote_average: 7.5,
  vote_count: 100,
  overview: "Overview",
};

describe("MovieItem", () => {
  it("renders movie title and year", () => {
    renderWithProviders(<MovieItem movie={mockMovie} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(
      screen.getByText(getYear(mockMovie.release_date)),
    ).toBeInTheDocument();
  });

  it("renders movie poster with correct src when poster src is available", () => {
    const { container } = renderWithProviders(<MovieItem movie={mockMovie} />);

    const poster = queryByTestIdStartingWith(
      container,
      SELECTORS.movieItem.poster,
    );

    expect(poster).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w200/test-poster.jpg",
    );
  });

  it("renders movie poster with default src when poster src is NOT available", () => {
    const testMovie = {
      ...mockMovie,
      poster_path: "",
    };
    const { container } = renderWithProviders(<MovieItem movie={testMovie} />);

    const poster = queryByTestIdStartingWith(
      container,
      SELECTORS.movieItem.poster,
    );

    expect(poster).toHaveAttribute(
      "src",
      "https://placehold.co/200x300?text=No+poster",
    );
  });

  it("trims overview text when it exceeds max length", () => {
    const longOverview = "a".repeat(200);
    const movieWithLongOverview = {
      ...mockMovie,
      overview: longOverview,
    };

    renderWithProviders(<MovieItem movie={movieWithLongOverview} />);

    expect(screen.queryByText(`${"a".repeat(150)}...`)).toBeInTheDocument();
    expect(screen.queryByText(`${"a".repeat(151)}...`)).not.toBeInTheDocument();
  });

  it("displays vote average and count", () => {
    renderWithProviders(<MovieItem movie={mockMovie} />);

    expect(screen.getByText("7.5")).toBeInTheDocument();
    expect(screen.getByText("100 votes", { exact: false })).toBeInTheDocument();
  });

  it("toggles favorite status when favorite button is clicked", () => {
    const { container } = renderWithProviders(<MovieItem movie={mockMovie} />);

    const favoriteBtn = queryByTestIdStartingWith(
      container,
      SELECTORS.movieItem.favoriteBtn,
    );
    fireEvent.click(favoriteBtn!);

    const activeFavoriteButton = queryByTestIdStartingWith(
      container,
      `${SELECTORS.movieItem.favoriteBtn}-on`,
    );
    expect(activeFavoriteButton).toBeInTheDocument();
  });
});
