import styles from "./HeaderLogo.module.scss";
import React from "react";
import { Logo } from "../../Logo/Logo";
import { Link } from "react-router-dom";

export const HeaderLogo = React.memo(() => {
  return (
    <Link
      className={styles.header__logo}
      to={`/`}
      aria-label="Перейти на главную страницу"
    >
      <Logo />
    </Link>
  );
});
