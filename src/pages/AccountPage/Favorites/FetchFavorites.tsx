import Api from "../../../api/api";
import { Favorites } from "./Favorites";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../../components/Loader/Loader";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

interface FavoritesProps {
  favoriteIds: string[];
}

export const FetchFavorites = ({ favoriteIds }: FavoritesProps) => {
  const fetchMovies = async () => {
    return await Promise.all(
      favoriteIds.map((id) => Api.getMovieById(Number(id)))
    );
  };

  const favoritesQuery = useQuery(
    {
      queryFn: fetchMovies,
      queryKey: ["favorites", favoriteIds],
    },
    queryClient
  );

  switch (favoritesQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <Favorites initialMovies={favoritesQuery.data} />;

    case "error":
      return <ErrorMessage onRetry={() => favoritesQuery.refetch()} />;
  }
};
