import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { GenresPage } from "../GenresPage";
import { BrowserRouter } from "react-router-dom";
import { Genres } from "../../../models";

jest.mock("../../../components/CardGenre/CardGenre", () => ({
  CardGenre: ({ data }: { data: string }) => (
    <div data-testid="card-genre">{data}</div>
  ),
}));

const mockGenres = ["Action", "Drama", "Comedy", "Thriller"];

const renderComponent = (genres: Genres) => {
  return render(
    <BrowserRouter>
      <GenresPage genres={genres} />
    </BrowserRouter>
  );
};

describe("GenresPage", () => {
  beforeEach(() => {
    renderComponent(mockGenres as Genres);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders page title", () => {
    expect(screen.getByText("Жанры фильмов")).toBeInTheDocument();
  });

  it("renders a list of genres", () => {
    const genreCards = screen.getAllByTestId("card-genre");
    expect(genreCards).toHaveLength(mockGenres.length);

    mockGenres.forEach((genre, index) => {
      expect(genreCards[index]).toHaveTextContent(genre);
    });
  });

  it("generates correct links for each genre", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockGenres.length);

    mockGenres.forEach((genre, index) => {
      expect(links[index]).toHaveAttribute("href", `/movie?genre=${genre}`);
      expect(links[index]).toHaveAttribute(
        "aria-label",
        `Перейти к ${genre} фильмам`
      );
    });
  });

  it("renders correctly with no genres", () => {
    cleanup();
    renderComponent([]);

    expect(screen.queryAllByTestId("card-genre")).toHaveLength(0);
    expect(screen.getByText("Жанры фильмов")).toBeInTheDocument();
  });
});
