import styles from "./CardMovie.module.scss";
import { SingleMovie } from "../../models";
import { usePreloadImages } from "../../hooks/usePreloadImages";

interface CardMovieProps {
  data: SingleMovie;
  index?: number;
  account?: boolean;
}

export const CardMovie = ({ data, index, account }: CardMovieProps) => {
  usePreloadImages(data.posterUrl);

  return (
    <div
      className={`${styles.card__movie} ${
        !index
          ? account
            ? styles.card__movie_favorites
            : styles.card__movie_genre
          : ""
      }`}
    >
      {index && <span className={styles.card__number}>{index}</span>}

      {data.posterUrl ? (
        <img
          src={data.posterUrl}
          alt={data.title}
          className={styles.card__poster}
          loading="lazy"
        />
      ) : (
        <div className={styles["card__no-poster"]}>
          <p className={styles.card__title}>{data.title}</p>
          <p className={styles["card__no-poster-text"]}>Постер недоступен</p>
        </div>
      )}
    </div>
  );
};
