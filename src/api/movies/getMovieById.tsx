import { SingleMovie } from "../../models";
import { BASE_URL } from "../config";

export const getMovieById = async (id: number): Promise<SingleMovie> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
