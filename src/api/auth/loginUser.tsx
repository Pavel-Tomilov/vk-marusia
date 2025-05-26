import { BASE_URL, defaultConfig } from "../config";

export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        ...defaultConfig.headers,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      let errorMessage = "Произошла ошибка при авторизации";

      switch (response.status) {
        case 400:
          errorMessage =
            errorDetails?.message || "Неверные авторизационные данные";
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
  } catch (error: any) {
    console.error("Ошибка авторизации:", error.message);
    throw new Error(error.message || "Неизвестная ошибка авторизации.");
  }
};
