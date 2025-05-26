import styles from "./Header.module.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthModal } from "../Modal/AuthModal/AuthModalContext";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { HeaderLogo } from "./HeaderLogo/HeaderLogo";
import { HeaderNav } from "./HeaderNav/HeaderNav";
import { HeaderSearch } from "./HeaderSearch/HeaderSearch";
import UserLogo from "../../assets/icons/setting.svg?react";

const Header = () => {
  const { userName, showModal } = useAuthModal();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <HeaderLogo />
        <HeaderNav isActive={isActive} />
        <HeaderSearch />

        {userName ? (
          <>
            <Link
              to={"/account"}
              className={`${styles.header__btn} nav__link ${
                isActive("/account") ? "active" : ""
              }`}
              aria-label="Перейти в личный кабинет"
            >
              {capitalizeFirstLetter(userName)}
            </Link>
            <Link
              to={"/account"}
              className={`${styles.header__btn} nav__link_small ${
                isActive("/account") ? "active" : ""
              }`}
              aria-label="Перейти в личный кабинет"
            >
              <UserLogo />
            </Link>
          </>
        ) : (
          <>
            <button
              className={`${styles.header__btn} nav__link`}
              onClick={showModal}
              aria-label="Открыть окно авторизации"
            >
              Войти
            </button>
            <button
              className={`${styles.header__btn} nav__link_small`}
              onClick={showModal}
              aria-label="Открыть окно авторизации"
            >
              <UserLogo />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
