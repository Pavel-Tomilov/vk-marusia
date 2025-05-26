import styles from "./ErrorMessage.module.scss";
import { Button } from "../Button/Button";

interface ErrorMessageProps {
  onRetry: () => void;
}

export const ErrorMessage = ({ onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.error__wrapper}>
      <span className={styles.error__text}>
        Произошла непредвиденная ошибка :(
      </span>
      <Button text="Повторить запрос" onClick={onRetry} />
    </div>
  );
};
