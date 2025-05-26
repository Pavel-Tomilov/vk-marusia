import styles from "./MovieWrapper.module.scss";
import Api from "../../api/api";
import FavoriteIcon from "../../assets/icons/favorite.svg?react";
import FavoriteFillIcon from "../../assets/icons/favorite-fill.svg?react";
import RefreshIcon from "../../assets/icons/refresh.svg?react";
import { Button } from "../Button/Button";
import { SingleMovie } from "../../models";
import { useNavigate } from "react-router-dom";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { useAuthModal } from "../Modal/AuthModal/AuthModalContext";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { usePreloadImages } from "../../hooks/usePreloadImages";

export interface MovieProps {
  movie: SingleMovie;
  showDetailsButton?: boolean;
  showRefreshButton?: boolean;
  onRefreshClick?: () => void;
}

export const MovieWrapper = ({
  movie,
  showDetailsButton = false,
  showRefreshButton = false,
  onRefreshClick,
}: MovieProps) => {
  usePreloadImages(movie.backdropUrl);
  const navigate = useNavigate();
  const { userName, showModal } = useAuthModal();
  const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);

  const accountQuery = useQuery(
    {
      queryFn: () => Api.fetchUser(),
      queryKey: ["user"],
      enabled: !!userName,
    },
    queryClient
  );

  const addFavoriteMutation = useMutation(
    {
      mutationFn: () => Api.addFavorites(movie.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    },
    queryClient
  );

  const removeFavoriteMutation = useMutation(
    {
      mutationFn: () => Api.deleteFavorites(movie.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    },
    queryClient
  );

  const isFavorite = accountQuery.data?.favorites.includes(`${movie.id}`);

  const onFavoriteClick = () => {
    if (!userName) {
      showModal();
      return;
    }

    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const openTrailerModal = () => {
    setTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setTrailerModalOpen(false);
  };

  return (
    <div className={styles.movie__container}>
      <div className={styles.movie__content}>
        <MovieInfo movie={movie} />
        <h2 className={styles.movie__title}>{movie.title}</h2>
        <p className={styles.movie__plot}>{movie.plot}</p>
        <div
          className={`${
            showDetailsButton ? styles.movie__nav_grid : styles.movie__nav_flex
          }`}
        >
          <Button
            text="Трейлер"
            onClick={openTrailerModal}
            aria-label="Перейти к просмотру трейлера"
          />

          {showDetailsButton && (
            <Button
              text="О фильме"
              type="grey"
              onClick={() => navigate(`/movie/${movie.id}`)}
              aria-label="Перейти к подробной информации о фильме"
            />
          )}

          <Button
            icon={isFavorite ? <FavoriteFillIcon /> : <FavoriteIcon />}
            type="grey"
            onClick={onFavoriteClick}
            aria-label="Добавить фильм в избранное"
          />

          {showRefreshButton && onRefreshClick && (
            <Button
              icon={<RefreshIcon />}
              type="grey"
              onClick={onRefreshClick}
              aria-label="Обновить случайный фильм"
            />
          )}
        </div>
      </div>

      <div className={styles.movie__poster}>
        {movie.backdropUrl ? (
          <img src={movie.backdropUrl} alt={movie.title} />
        ) : (
          <>
            <p className={styles.movie__title}>{movie.title}</p>
            <p className={styles.movie__poster_descr}>Постер недоступен</p>
          </>
        )}
      </div>

      <TrailerModal
        isOpen={isTrailerModalOpen}
        movieTitle={movie.title}
        trailerUrl={movie.trailerUrl}
        onClose={closeTrailerModal}
      />
    </div>
  );
};
