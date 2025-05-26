import styles from "./TrailerModal.module.scss";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { Controls } from "./Controls/Controls";
import { useState, useEffect } from "react";

interface TrailerModalProps {
  isOpen: boolean;
  movieTitle: string;
  trailerUrl: string | null;
  onClose: () => void;
}

export const TrailerModal = ({
  isOpen,
  movieTitle,
  trailerUrl,
  onClose,
}: TrailerModalProps) => {
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsPlay(true);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    setIsPlay((prev) => !prev);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.trailer}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
    >
      {trailerUrl ? (
        <div className={styles.trailer__wrapper}>
          <div
            className={styles.trailer__overlay_layer}
            onClick={handlePlayPause}
          ></div>

          <ReactPlayer
            url={trailerUrl}
            playing={isPlay}
            controls={false}
            width="100%"
            height="100%"
          />

          <Controls
            playing={isPlay}
            title={movieTitle}
            handlePlayPause={handlePlayPause}
          />
        </div>
      ) : (
        <div className={styles.trailer__wrapper}>
          <div>Видео недоступно :(</div>
        </div>
      )}

      {!isPlay && (
        <button
          className={styles.trailer__close}
          onClick={onClose}
          aria-label="Закрыть просмотр трейлера"
        >
          ×
        </button>
      )}
    </ReactModal>
  );
};
