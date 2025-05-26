import styles from "./SuccessForm.module.scss";
import { Button } from "../../Button/Button";

interface SuccessFormProps {
  onButtonClick: () => void;
}

export const SuccessForm = ({ onButtonClick }: SuccessFormProps) => {
  return (
    <div className={styles.success__form}>
      <h3 className={styles.success__title}>Регистрация завершена</h3>
      <p className={styles.success__text}>
        Используйте вашу электронную почту для входа
      </p>
      <Button
        text="Войти"
        onClick={onButtonClick}
        aria-label="Войти в аккаунт, используя электронную почту"
      />
    </div>
  );
};
