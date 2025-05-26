import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { AccountPage } from "../AccountPage";
import { User } from "../../../models";

jest.mock("../Favorites/FetchFavorites", () => ({
  FetchFavorites: ({ favoriteIds }: { favoriteIds: string[] }) => (
    <div data-testid="favorites">Favorite Movies: {favoriteIds.join(", ")}</div>
  ),
}));

jest.mock("../Settings/Settings", () => ({
  Settings: ({ data }: { data: User }) => (
    <div data-testid="settings">Settings for: {data.name}</div>
  ),
}));

const mockUser: User = {
  email: "test@mail.com",
  favorites: ["1", "2", "3"],
  name: "John",
  surname: "Smith",
};

describe("AccountPage", () => {
  beforeEach(() => {
    render(<AccountPage account={mockUser} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders account page with default favorites tab", () => {
    expect(screen.getByText("Мой аккаунт")).toBeInTheDocument();
    expect(screen.getByText("Избранные фильмы")).toBeInTheDocument();
    expect(screen.getByText("Настройка аккаунта")).toBeInTheDocument();
    expect(screen.getByTestId("favorites")).toBeInTheDocument();
    expect(screen.getByText("Favorite Movies: 1, 2, 3")).toBeInTheDocument();

    const favoritesTab = screen.getByText("Избранные фильмы").closest("a");
    expect(favoritesTab).toHaveClass("active");
  });

  it("switches to settings tab when clicked", () => {
    const settingsTab = screen.getByText("Настройка аккаунта");
    fireEvent.click(settingsTab);

    expect(screen.getByTestId("settings")).toBeInTheDocument();
    expect(screen.getByText("Settings for: John")).toBeInTheDocument();

    expect(settingsTab.closest("a")).toHaveClass("active");
  });

  it("switches back to favorites tab when clicked", () => {
    const favoritesTab = screen.getByText("Избранные фильмы");
    fireEvent.click(favoritesTab);

    expect(screen.getByTestId("favorites")).toBeInTheDocument();
    expect(screen.getByText("Favorite Movies: 1, 2, 3")).toBeInTheDocument();

    expect(favoritesTab.closest("a")).toHaveClass("active");
  });
});
