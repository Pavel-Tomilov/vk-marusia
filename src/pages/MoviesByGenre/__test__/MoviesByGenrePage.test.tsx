import "@testing-library/jest-dom";
import Api from "../../../api/api";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MoviesByGenrePage } from "../MoviesByGenrePage";
import { BrowserRouter } from "react-router-dom";
import { Movies } from "../../../models";

jest.mock("../../../api/api");

jest.mock("../../../components/CardMovie/CardMovie", () => ({
  CardMovie: ({ data }: { data: { title: string } }) => (
    <div data-testid="card-movie">
      <h3>{data.title}</h3>
    </div>
  ),
}));

interface SimplifiedMovie {
  id: number;
  title: string;
  genres: string[];
}

const mockMovies: SimplifiedMovie[] = [
  {
    id: 1,
    title: "Inception",
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    genres: ["Action", "Crime"],
  },
];

const mockGenre = "Action";

const renderComponent = (initialMovies: Movies, genre: string) => {
  return render(
    <BrowserRouter>
      <MoviesByGenrePage initialMovies={initialMovies} genre={genre} />
    </BrowserRouter>
  );
};

describe("MoviesByGenrePage", () => {
  beforeEach(() => {
    (Api.getMoviesByGenre as jest.Mock).mockResolvedValue(mockMovies);
    renderComponent(mockMovies as Movies, mockGenre);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie genre page correctly with initial movies", () => {
    expect(screen.getByText("Action")).toBeInTheDocument();

    const movieCards = screen.getAllByTestId("card-movie");
    expect(movieCards).toHaveLength(mockMovies.length);

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("loads more movies when 'Show More' button is clicked", async () => {
    const showMoreButton = screen.getByText("Показать ещё");
    expect(showMoreButton).toBeInTheDocument();
    fireEvent.click(showMoreButton);
    await waitFor(() =>
      expect(showMoreButton).toHaveTextContent("Загрузка...")
    );
    await waitFor(() => expect(Api.getMoviesByGenre).toHaveBeenCalledTimes(1));
  });
});
