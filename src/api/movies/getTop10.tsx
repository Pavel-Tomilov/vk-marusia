import { BASE_URL } from "../config";
import { Movies } from "../../models/Movie";

export const getTop10 = async (): Promise<Movies> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top10`);

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
