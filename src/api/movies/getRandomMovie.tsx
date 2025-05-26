import { BASE_URL } from "../config";
import { SingleMovie } from "../../models/Movie";

export const getRandomMovie = async (): Promise<SingleMovie> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/random`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
