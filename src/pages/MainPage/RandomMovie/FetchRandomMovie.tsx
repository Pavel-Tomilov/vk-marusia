import styles from "./RandomMovie.module.scss";
import Api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { RandomMovie } from "./RandomMovie";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

export const FetchRandomMovie = () => {
  const randomMovieQuery = useQuery(
    {
      queryFn: () => Api.getRandomMovie(),
      queryKey: ["random"],
    },
    queryClient
  );

  switch (randomMovieQuery.status) {
    case "pending":
      return (
        <div className={styles.random__movie}>
          <div className={styles.random__movie_loading}>Loading</div>
        </div>
      );

    case "success":
      return (
        <RandomMovie
          randomMovie={randomMovieQuery.data}
          refetch={randomMovieQuery.refetch}
        />
      );

    case "error":
      return (
        <div className={styles.random__movie}>
          <ErrorMessage onRetry={() => randomMovieQuery.refetch()} />
        </div>
      );
  }
};
