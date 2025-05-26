import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "../RegisterForm";

const fillRegisterForm = (
  email: string,
  name: string,
  surname: string,
  password: string,
  confirmPassword: string
) => {
  const emailInput = screen.getByPlaceholderText("Электронная почта");
  const nameInput = screen.getByPlaceholderText("Имя");
  const surnameInput = screen.getByPlaceholderText("Фамилия");
  const passwordInput = screen.getByPlaceholderText("Пароль");
  const confirmPasswordInput =
    screen.getByPlaceholderText("Подтвердите пароль");
  const submitButton = screen.getByText("Создать аккаунт");

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(surnameInput, { target: { value: surname } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: confirmPassword },
  });

  fireEvent.click(submitButton);
};

describe("RegisterForm", () => {
  beforeEach(() => {
    render(<RegisterForm handleRegistrationSuccess={() => {}} />);
  });

  it("renders form and submits with valid input", async () => {
    fillRegisterForm(
      "test@example.com",
      "John",
      "Doe",
      "password123",
      "password123"
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Некорректный формат email")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Недопустимые символы")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Длина пароля должна быть не менее 8 символов")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Пароли должны совпадать")
      ).not.toBeInTheDocument();
    });
  });

  it("shows validation error for incorrect email format", async () => {
    fillRegisterForm(
      "invalid-email",
      "John",
      "Doe",
      "password123",
      "password123"
    );

    await waitFor(() => {
      expect(screen.getByText("Некорректный формат email")).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid name", async () => {
    fillRegisterForm(
      "test@example.com",
      "John123",
      "Doe",
      "password123",
      "password123"
    );

    await waitFor(() => {
      expect(screen.getByText("Недопустимые символы")).toBeInTheDocument();
    });
  });

  it("shows validation error for short password", async () => {
    fillRegisterForm("test@example.com", "John", "Doe", "short", "password123");

    await waitFor(() => {
      expect(
        screen.getByText("Длина пароля должна быть не менее 8 символов")
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for non-matching passwords", async () => {
    fillRegisterForm(
      "test@example.com",
      "John",
      "Doe",
      "password123",
      "differentPassword"
    );

    await waitFor(() => {
      expect(screen.getByText("Пароли должны совпадать")).toBeInTheDocument();
    });
  });
});
