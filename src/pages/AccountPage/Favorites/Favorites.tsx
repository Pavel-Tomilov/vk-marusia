import styles from "./Favorites.module.scss";
import Api from "../../../api/api";
import { useState } from "react";
import { Movies } from "../../../models";
import { CardMovie } from "../../../components/CardMovie/CardMovie";
import { Link } from "react-router-dom";

interface FavoritesProps {
  initialMovies: Movies;
}

export const Favorites = ({ initialMovies }: FavoritesProps) => {
  const [movies, setMovies] = useState<Movies>(initialMovies);

  const handleDelete = async (movieId: number) => {
    try {
      await Api.deleteFavorites(movieId);

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error("Ошибка при удалении фильма:", error);
    }
  };

  return (
    <div className={styles.favorites__wrapper}>
      <ul className={styles.favorites__list}>
        {movies.map((movie) => (
          <li className={styles.favorites__item} key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className={`movie__link ${styles.favorites__link}`}
              aria-label={`Перейти к информации о фильме ${movie.title}`}
            >
              {<CardMovie data={movie} account={true} />}
            </Link>
            <button
              className={styles.favorites__delete}
              onClick={() => handleDelete(movie.id)}
              aria-label="Удалить фильм из избранного"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
