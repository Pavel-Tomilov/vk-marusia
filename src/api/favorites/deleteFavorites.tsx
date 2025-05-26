import { User } from "../../models";
import { BASE_URL, defaultConfig } from "../config";

export const deleteFavorites = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        ...defaultConfig.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Ошибка при удалении: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
