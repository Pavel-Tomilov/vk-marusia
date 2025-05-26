import { Movies } from "../../models";
import { BASE_URL } from "../config";

export const getMoviesByGenre = async (
  genre: string,
  page: number = 1
): Promise<Movies> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?genre=${genre}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
