import { Movies } from "../../models";
import { BASE_URL } from "../config";

export const getFavorites = async (): Promise<Movies> => {
  try {
    const response = await fetch(`${BASE_URL}/favorites`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Ошибка при получении избранных фильмов");
    }

    const data = response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
