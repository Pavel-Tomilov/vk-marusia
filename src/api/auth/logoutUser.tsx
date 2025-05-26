import { BASE_URL } from "../config";

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);

      throw new Error(
        errorDetails?.message ||
          `Ошибка при завершении сессии: ${response.status}`
      );
    }
  } catch (error: any) {
    console.error("Ошибка при разлогинивании:", error.message);
    throw new Error(error.message || "Неизвестная ошибка разлогинивания.");
  }
};
