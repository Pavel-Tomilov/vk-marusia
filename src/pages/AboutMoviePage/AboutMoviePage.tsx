import styles from "./AboutMoviePage.module.scss";
import { SingleMovie } from "../../models";
import { MovieWrapper } from "../../components/MovieWrapper/MovieWrapper";
import { formatNumber } from "../../utils/formatNumber";

export interface MovieProps {
  movie: SingleMovie;
}

export const AboutMoviePage = ({ movie }: MovieProps) => {
  return (
    <div className={`container ${styles.about__container}`}>
      <div className={styles.about__main}>
        <MovieWrapper movie={movie} />
      </div>
      <h2 className={styles.about__title}>О фильме</h2>
      <ul className={styles.about__list}>
        <li className={styles.about__item}>
          <span>Язык оригинала</span>
          <span>{movie.language}</span>
        </li>
        <li className={styles.about__item}>
          <span>Бюджет</span>
          <span>
            {movie.budget
              ? `${formatNumber(Number(movie.budget))} $`
              : "данные не доступны"}
          </span>
        </li>
        <li className={styles.about__item}>
          <span>Выручка</span>
          <span>
            {movie.revenue
              ? `${formatNumber(Number(movie.revenue))} $`
              : "данные не доступны"}
          </span>
        </li>
        <li className={styles.about__item}>
          <span>Режиссёр</span>
          <span>{movie.director ? movie.director : "не указан"}</span>
        </li>
        <li className={styles.about__item}>
          <span>Продакшен</span>
          <span>{movie.production ? movie.production : "не указано"}</span>
        </li>
        <li className={styles.about__item}>
          <span>Награды</span>
          <span>
            {movie.awardsSummary
              ? movie.awardsSummary
              : "информация отсутствует"}
          </span>
        </li>
      </ul>
    </div>
  );
};
