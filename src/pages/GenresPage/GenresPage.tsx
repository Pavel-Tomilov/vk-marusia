import styles from "./GenresPage.module.scss";
import { Genres } from "../../models";
import { CardGenre } from "../../components/CardGenre/CardGenre";
import { Link } from "react-router-dom";

export interface GenresProps {
  genres: Genres;
}

export const GenresPage = ({ genres }: GenresProps) => {
  return (
    <section className={styles.genres}>
      <div className={`container ${styles.genres__container}`}>
        <h2 className={styles.genres__title}>Жанры фильмов</h2>
        <ul className={styles.genres__list}>
          {genres.map((genre, index) => (
            <li key={index}>
              <Link
                to={`/movie?genre=${genre}`}
                className="movie__link"
                aria-label={`Перейти к ${genre} фильмам`}
              >
                <CardGenre data={genre} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
