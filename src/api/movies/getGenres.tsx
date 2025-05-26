import { Genres } from "../../models";
import { BASE_URL } from "../config";

export const getGenres = async (): Promise<Genres> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/genres`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
