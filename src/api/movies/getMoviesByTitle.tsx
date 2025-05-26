import { Movies } from "../../models";
import { BASE_URL } from "../config";

export const getMoviesByTitle = async (title: string): Promise<Movies> => {
  try {
    const response = await fetch(`${BASE_URL}/movie?title=${title}`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
