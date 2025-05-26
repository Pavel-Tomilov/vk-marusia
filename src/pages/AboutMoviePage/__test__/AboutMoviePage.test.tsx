import "@testing-library/jest-dom";
import { BrowserRouter, useParams } from "react-router-dom";
import { AuthModalProvider } from "../../../components/Modal/AuthModal/AuthModalContext";
import { render, screen } from "@testing-library/react";
import { AboutMoviePage } from "../AboutMoviePage";
import { IMovie } from "../../../models/Movie";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockMovie: Partial<IMovie> = {
  id: 1,
  title: "Inception",
  language: "English",
  budget: "160000000",
  revenue: "829895144",
  director: "Christopher Nolan",
  production: "Syncopy",
  awardsSummary: "Oscar-winning movie",
};

const incompleteMockMovie: Partial<IMovie> = {
  id: 2,
  title: "Unknown Movie",
  language: "ru",
  budget: null,
  revenue: null,
  director: null,
  production: null,
  awardsSummary: null,
};

const renderComponent = (movie: IMovie) => {
  return render(
    <BrowserRouter>
      <AuthModalProvider>
        <AboutMoviePage movie={movie} />
      </AuthModalProvider>
    </BrowserRouter>
  );
};

describe("AboutMoviePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all movie details correctly", () => {
    (useParams as jest.Mock).mockReturnValue({ movieId: "1" });

    renderComponent(mockMovie as IMovie);

    expect(screen.getByText("О фильме")).toBeInTheDocument();
    expect(screen.getByText("Язык оригинала")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Бюджет")).toBeInTheDocument();
    expect(screen.getByText("160 000 000 $")).toBeInTheDocument();
    expect(screen.getByText("Выручка")).toBeInTheDocument();
    expect(screen.getByText("829 895 144 $")).toBeInTheDocument();
    expect(screen.getByText("Режиссёр")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
    expect(screen.getByText("Продакшен")).toBeInTheDocument();
    expect(screen.getByText("Syncopy")).toBeInTheDocument();
    expect(screen.getByText("Награды")).toBeInTheDocument();
    expect(screen.getByText("Oscar-winning movie")).toBeInTheDocument();
  });

  test("renders fallback text for missing movie details", () => {
    (useParams as jest.Mock).mockReturnValue({ movieId: "2" });

    renderComponent(incompleteMockMovie as IMovie);

    const missingDataText = screen.queryAllByText("данные не доступны");
    expect(missingDataText.length).toBeGreaterThan(0);

    const notAvailableTexts = [
      "не указан",
      "не указано",
      "информация отсутствует",
    ];

    notAvailableTexts.forEach((text) => {
      expect(screen.queryAllByText(text).length).toBeGreaterThan(0);
    });
  });

  test("renders with correct container and main styles", () => {
    (useParams as jest.Mock).mockReturnValue({ movieId: "1" });

    const { container } = renderComponent(mockMovie as IMovie);

    const aboutContainer = container.querySelector(".about__container");
    const aboutMain = container.querySelector(".about__main");

    expect(aboutContainer).toBeInTheDocument();
    expect(aboutMain).toBeInTheDocument();
  });
});
