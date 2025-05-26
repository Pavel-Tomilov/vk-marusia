import styles from "./Controls.module.scss";
import PauseIcon from "../../../assets/icons/pause.svg?react";
import PlayIcon from "../../../assets/icons/play.svg?react";

interface ControlsProps {
  playing: boolean;
  title: string;
  handlePlayPause: () => void;
}

export const Controls = ({
  playing,
  title,
  handlePlayPause,
}: ControlsProps) => {
  return (
    <>
      <div
        className={`${styles.controls} controls__visible`}
        onClick={() => handlePlayPause()}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </div>

      {!playing && (
        <div className={`${styles.controls__title} controls__visible`}>
          {title}
        </div>
      )}
    </>
  );
};
