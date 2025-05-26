import Api from "../../api/api";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MoviesByGenrePage } from "./MoviesByGenrePage";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const FetchMoviesByGenrePage = () => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "";

  const moviesQuery = useQuery(
    {
      queryFn: () => Api.getMoviesByGenre(genre, 1),
      queryKey: ["moviesByGenre", genre],
    },
    queryClient
  );

  switch (moviesQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return (
        <MoviesByGenrePage initialMovies={moviesQuery.data} genre={genre} />
      );

    case "error":
      return <ErrorMessage onRetry={() => moviesQuery.refetch()} />;
  }
};

export default FetchMoviesByGenrePage;
