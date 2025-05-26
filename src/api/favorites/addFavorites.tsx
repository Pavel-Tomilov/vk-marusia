import { BASE_URL, defaultConfig } from "../config";

export const addFavorites = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        ...defaultConfig.headers,
      },
      body: JSON.stringify({ id: id.toString() }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Ошибка при добавлении в избранное: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
