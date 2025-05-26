import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";

const fillLoginForm = (email: string, password: string) => {
  const emailInput = screen.getByPlaceholderText("Электронная почта");
  const passwordInput = screen.getByPlaceholderText("Пароль");
  const submitButton = screen.getByText("Войти");

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(submitButton);
};

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm handleLoginSuccess={() => {}} />);
  });

  it("renders form and submits with valid input", async () => {
    fillLoginForm("test@example.com", "password123");

    await waitFor(() => {
      expect(
        screen.queryByText("Некорректный формат email")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Длина пароля должна быть не менее 8 символов")
      ).not.toBeInTheDocument();
    });
  });

  it("shows validation error for incorrect email format", async () => {
    fillLoginForm("invalid-email", "password123");

    await waitFor(() => {
      expect(screen.getByText("Некорректный формат email")).toBeInTheDocument();
    });
  });

  it("shows validation error for short password", async () => {
    fillLoginForm("test@example.com", "short");

    await waitFor(() => {
      expect(
        screen.getByText("Длина пароля должна быть не менее 8 символов")
      ).toBeInTheDocument();
    });
  });
});
