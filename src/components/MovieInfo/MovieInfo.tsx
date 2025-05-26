import styles from "./MovieInfo.module.scss";
import { SingleMovie } from "../../models";
import { arrayToString } from "../../utils/arrayToString";
import { formatTime } from "../../utils/formatTime";

const style: { [key: string]: string } = styles;

interface MovieInfoInterface {
  movie: SingleMovie;
  size?: "small" | "big";
}

export const MovieInfo = ({ movie, size = "big" }: MovieInfoInterface) => {
  let rating = "";

  if (movie.tmdbRating <= 10 && movie.tmdbRating >= 8) {
    rating = "excellent";
  } else if (movie.tmdbRating < 8 && movie.tmdbRating >= 6) {
    rating = "good";
  } else if (movie.tmdbRating < 6 && movie.tmdbRating >= 4) {
    rating = "poor";
  } else rating = "bullshit";

  return (
    <div
      className={`${styles.movie__info} ${
        size ? styles[`movie__info_${size}`] : ""
      }`}
    >
      <span
        className={`${styles.movie__rating} ${
          styles[`movie__rating_${rating}`]
        }`}
      >
        {movie.tmdbRating}
      </span>
      <span className={styles.movie__release}>{movie.releaseYear}</span>
      <span className={styles.movie__genres}>
        {arrayToString(movie.genres)}
      </span>
      <span
        className={styles.movie__runtime}
        dangerouslySetInnerHTML={{ __html: formatTime(movie.runtime) }}
      ></span>
    </div>
  );
};
