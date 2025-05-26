import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { Top10 } from "../Top10";
import { BrowserRouter } from "react-router-dom";
import { Movies } from "../../../../models";

jest.mock("../../../../components/CardMovie/CardMovie", () => ({
  CardMovie: ({ data, index }: { data: { title: string }; index: number }) => (
    <div data-testid="card-movie">
      <h3>
        {index}. {data.title}
      </h3>
    </div>
  ),
}));

interface SimplifiedMovie {
  id: number;
  title: string;
  genres: string[];
  posterUrl: string;
  tmdbRating: number;
  director: string | null;
}

export const mockTop10: SimplifiedMovie[] = [
  {
    id: 1,
    title: "Inception",
    genres: ["Action", "Sci-Fi", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/original/inception.jpg",
    tmdbRating: 8.8,
    director: "Christopher Nolan",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genres: ["Action", "Crime", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/original/dark_knight.jpg",
    tmdbRating: 9.0,
    director: "Christopher Nolan",
  },
];

const renderComponent = (top10: Movies) => {
  render(
    <BrowserRouter>
      <Top10 top10={top10} />
    </BrowserRouter>
  );
};

describe("Top10", () => {
  beforeEach(() => {
    renderComponent(mockTop10 as Movies);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title correctly", () => {
    expect(screen.getByText("Топ 10 фильмов")).toBeInTheDocument();
  });

  it("renders the correct number of movies", () => {
    const movieCards = screen.getAllByTestId("card-movie");
    expect(movieCards).toHaveLength(mockTop10.length);

    mockTop10.forEach((movie, index) => {
      expect(
        screen.getByText(`${index + 1}. ${movie.title}`)
      ).toBeInTheDocument();
    });
  });

  it("generates correct links for movies", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockTop10.length);

    mockTop10.forEach((movie, index) => {
      expect(links[index]).toHaveAttribute("href", `/movie/${movie.id}`);
      expect(links[index]).toHaveAttribute(
        "aria-label",
        `Перейти к информации о фильме ${movie.title}`
      );
    });
  });

  it("renders correctly when the top10 list is empty", () => {
    cleanup();
    renderComponent([]);

    expect(screen.getByText("Топ 10 фильмов")).toBeInTheDocument();
    expect(screen.queryAllByTestId("card-movie")).toHaveLength(0);
  });
});
