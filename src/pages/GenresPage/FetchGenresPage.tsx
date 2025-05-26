import Api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { GenresPage } from "./GenresPage";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const FetchGenrePage = () => {
  const genresQuery = useQuery(
    {
      queryFn: () => Api.getGenres(),
      queryKey: ["genres"],
    },
    queryClient
  );

  switch (genresQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <GenresPage genres={genresQuery.data} />;

    case "error":
      return <ErrorMessage onRetry={() => genresQuery.refetch()} />;
  }
};

export default FetchGenrePage;
