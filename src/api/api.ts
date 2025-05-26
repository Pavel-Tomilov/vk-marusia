import { loginUser, logoutUser, registerUser, fetchUser } from "./auth";
import { getFavorites, addFavorites, deleteFavorites } from "./favorites";
import {
  getMoviesByGenre,
  getMoviesByTitle,
  getMovieById,
  getRandomMovie,
  getTop10,
  getGenres,
} from "./movies";

const Api = {
  getMoviesByGenre,
  getMoviesByTitle,
  getMovieById,
  getRandomMovie,
  getTop10,
  getGenres,
  loginUser,
  logoutUser,
  registerUser,
  fetchUser,
  getFavorites,
  addFavorites,
  deleteFavorites,
};

export default Api;
