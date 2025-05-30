import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieTitle } from "../MovieTitle/MovieTitle";
import { SELECTORS } from "@/constants/testSelectors";
import { queryByTestIdStartingWith } from "@/test/helpers";

describe("MovieTitle", () => {
  it("renders title correctly", () => {
    render(<MovieTitle title="Test Movie" year="2023" />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("renders year when provided", () => {
    render(<MovieTitle title="Test Movie" year="2023" />);
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("does not render year when not provided", () => {
    const title = "Test Movie";
    const year = "";

    const { container } = render(<MovieTitle title={title} year={year} />);

    expect(
      queryByTestIdStartingWith(container, SELECTORS.movieTitle.year),
    ).not.toBeInTheDocument();
  });
});
