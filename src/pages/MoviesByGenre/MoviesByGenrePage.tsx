import styles from "./MoviesByGenrePage.module.scss";
import { useCallback, useState, useEffect } from "react";
import Api from "../../api/api";
import { Movies } from "../../models";
import { Link } from "react-router-dom";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { Button } from "../../components/Button/Button";

interface MoviesProps {
  initialMovies: Movies;
  genre: string;
}

export const MoviesByGenrePage = ({ initialMovies, genre }: MoviesProps) => {
  const [movies, setMovies] = useState<Movies>(initialMovies);
  const [visibleMovies, setVisibleMovies] = useState<Movies>(
    movies.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);

  const loadMoreMovies = useCallback(async () => {
    if (isLoading || !hasMoreMovies) return;

    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const newMovies = await Api.getMoviesByGenre(genre, nextPage);

      if (newMovies.length === 0) {
        setHasMoreMovies(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);

        setVisibleMovies((prevVisible) => [
          ...prevVisible,
          ...newMovies.slice(0, 10),
        ]);

        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, genre, isLoading, hasMoreMovies]);

  const handleShowMore = useCallback(() => {
    const nextVisibleMovies = movies.slice(
      visibleMovies.length,
      visibleMovies.length + 10
    );

    if (nextVisibleMovies.length < 10 && hasMoreMovies) {
      loadMoreMovies();
    }

    setVisibleMovies((prevVisible) => [...prevVisible, ...nextVisibleMovies]);
  }, [movies, visibleMovies, hasMoreMovies, loadMoreMovies, isLoading]);

  useEffect(() => {
    const scrollToUpdatedPosition = () => {
      const footerHeight = 200;
      const documentHeight = document.documentElement.scrollHeight;
      const offset = documentHeight - footerHeight - window.innerHeight;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    };

    requestAnimationFrame(scrollToUpdatedPosition);
  }, [visibleMovies]);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkVerticalScroll = () => {
      const hasVerticalScroll =
        document.documentElement.scrollHeight > window.innerHeight;
      setShowScrollUpButton(hasVerticalScroll);
    };

    checkVerticalScroll();
    window.addEventListener("resize", checkVerticalScroll);
    window.addEventListener("scroll", checkVerticalScroll);

    return () => {
      window.removeEventListener("resize", checkVerticalScroll);
      window.removeEventListener("scroll", checkVerticalScroll);
    };
  }, []);

  return (
    <section className={styles.genre}>
      <div className={`container ${styles.genre__container}`}>
        <Link
          to={`/movie/genres`}
          className={styles.genre__title}
          aria-label="Перейти к странице со списком жанров"
        >
          {capitalizeFirstLetter(`${genre}`)}
        </Link>
        <ul className={styles.genre__list}>
          {visibleMovies.map((movie) => (
            <li key={movie.id} className={styles.genre__item}>
              <Link
                to={`/movie/${movie.id}`}
                className="movie__link"
                aria-label={`Перейти к информации о фильме ${movie.title}`}
              >
                {<CardMovie data={movie} />}
              </Link>
            </li>
          ))}
        </ul>

        {hasMoreMovies && (
          <Button
            text={isLoading ? "Загрузка..." : "Показать ещё"}
            onClick={handleShowMore}
            disabled={isLoading}
            aria-label="Показать еще фильмы этого жанра"
          />
        )}

        {showScrollUpButton && (
          <div className={styles.genre__btn_up}>
            <Button
              text="Back to Top"
              type="grey"
              onClick={handleScrollUp}
              aria-label="Вернуться на верх страницы"
            />
          </div>
        )}
      </div>
    </section>
  );
};
