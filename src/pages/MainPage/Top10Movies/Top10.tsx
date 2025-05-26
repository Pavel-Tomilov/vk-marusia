import styles from "./Top10.module.scss";
import { Movies } from "../../../models";
import { CardMovie } from "../../../components/CardMovie/CardMovie";
import { Link } from "react-router-dom";

export interface Top10Props {
  top10: Movies;
}

export const Top10 = ({ top10 }: Top10Props) => {
  return (
    <section className={styles.top10}>
      <div className="container">
        <h2 className={styles.top10__title}>Топ 10 фильмов</h2>
        <div className={styles.top10__content}>
          <ul className={styles.top10__list}>
            {top10.map((movie, index) => (
              <li key={movie.id}>
                <Link
                  to={`/movie/${movie.id}`}
                  className="movie__link"
                  aria-label={`Перейти к информации о фильме ${movie.title}`}
                >
                  {<CardMovie data={movie} index={index + 1} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
