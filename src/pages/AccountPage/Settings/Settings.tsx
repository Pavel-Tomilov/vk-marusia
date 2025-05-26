import styles from "./Settings.module.scss";
import Api from "../../../api/api";
import EmailLogo from "../../../assets/icons/email.svg?react";
import { User } from "../../../models";
import { getInitials } from "../../../utils/getInitials";
import { Button } from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../../components/Modal/AuthModal/AuthModalContext";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

interface SettingsProps {
  data: User;
}

export const Settings = ({ data }: SettingsProps) => {
  const { setUserName } = useAuthModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      Api.logoutUser();
      setUserName(null);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при разлогировании:", error);
    }
  };

  return (
    <div className={styles.settings__wrapper}>
      <ul className={styles.settings__list}>
        <li className={styles.settings__item}>
          <span className={styles.settings__icon}>
            {getInitials(data.name, data.surname)}
          </span>
          <div>
            <span className={styles.settings__subtitle}>Имя Фамилия</span>
            <p className={styles.settings__data}>{`${capitalizeFirstLetter(
              data.name
            )} ${capitalizeFirstLetter(data.surname)}`}</p>
          </div>
        </li>
        <li className={styles.settings__item}>
          <span className={styles.settings__icon}>
            <EmailLogo />
          </span>
          <div>
            <span className={styles.settings__subtitle}>Электронная почта</span>
            <p className={styles.settings__data}>{data.email}</p>
          </div>
        </li>
      </ul>
      <Button text="Выйти из аккаунта" onClick={handleLogout} />
    </div>
  );
};
