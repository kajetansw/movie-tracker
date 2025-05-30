import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieVote } from "../MovieVote/MovieVote";

describe("MovieVote", () => {
  it("renders vote average and count when provided", () => {
    render(<MovieVote average={7.5} count={100} />);

    expect(screen.getByText("7.5")).toBeInTheDocument();
    expect(screen.getByText("/ 10 (100 votes)")).toBeInTheDocument();
  });

  it('renders "No votes" when average is null', () => {
    render(<MovieVote average={0} count={0} />);

    expect(screen.getByText("No votes")).toBeInTheDocument();
  });

  it("rounds down (when applicable) vote average to 1 decimal place", () => {
    render(<MovieVote average={7.849} count={100} />);
    expect(screen.getByText("7.8")).toBeInTheDocument();
  });

  it("rounds up (when applicable) vote average to 1 decimal place", () => {
    render(<MovieVote average={7.851} count={100} />);
    expect(screen.getByText("7.9")).toBeInTheDocument();
  });
});
