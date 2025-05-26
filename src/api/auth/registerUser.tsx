import { BASE_URL, defaultConfig } from "../config";

export const registerUser = async (
  email: string,
  name: string,
  surname: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        ...defaultConfig.headers,
      },
      body: JSON.stringify({ email, name, surname, password }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      let errorMessage = "Произошла ошибка при регистрации";

      switch (response.status) {
        case 400:
          errorMessage =
            errorDetails?.message || "Некорректные данные. Проверьте форму.";
          break;
        case 409:
          errorMessage = "Такой пользователь уже существует.";
          break;
        case 500:
          errorMessage = "Внутренняя ошибка сервера. Попробуйте позже.";
          break;
        default:
          errorMessage =
            "Неизвестная ошибка. Пожалуйста, свяжитесь с поддержкой.";
      }

      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
};
