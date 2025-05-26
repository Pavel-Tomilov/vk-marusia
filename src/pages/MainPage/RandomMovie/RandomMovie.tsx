import styles from "./RandomMovie.module.scss";
import { SingleMovie } from "../../../models";
import { MovieWrapper } from "../../../components/MovieWrapper/MovieWrapper";

export interface RandomMovieProps {
  randomMovie: SingleMovie;
  refetch: () => void;
}

export const RandomMovie = ({ randomMovie, refetch }: RandomMovieProps) => {
  return (
    <section className={styles.random__movie}>
      <div className="container">
        <MovieWrapper
          movie={randomMovie}
          showDetailsButton={true}
          showRefreshButton={true}
          onRefreshClick={refetch}
        />
      </div>
    </section>
  );
};
