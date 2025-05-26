import { User } from "../../models";
import { BASE_URL } from "../config";

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/profile`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
