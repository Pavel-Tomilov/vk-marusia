import Api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../api/queryClient";
import { AboutMoviePage } from "./AboutMoviePage";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const FetchAboutMoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const aboutMovieQuery = useQuery(
    {
      queryFn: () => Api.getMovieById(Number(movieId)),
      queryKey: ["movie", movieId],
    },
    queryClient
  );

  switch (aboutMovieQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <AboutMoviePage movie={aboutMovieQuery.data} />;

    case "error":
      return <ErrorMessage onRetry={() => aboutMovieQuery.refetch()} />;
  }
};

export default FetchAboutMoviePage;
