import styles from "./HeaderNav.module.scss";
import React from "react";
import GenresIcon from "../../../assets/icons/genres.svg?react";
import { Link } from "react-router-dom";

export const HeaderNav = React.memo(
  ({ isActive }: { isActive: (path: string) => boolean }) => {
    return (
      <nav className={styles.header__nav}>
        <Link
          className={`nav__link ${isActive("/") ? "active" : ""}`}
          to={`/`}
          aria-label="Перейти на главную страницу"
        >
          Главная
        </Link>
        <Link
          className={`nav__link ${isActive("/movie/genres") ? "active" : ""}`}
          to={`/movie/genres`}
          aria-label="Перейти на страницу со списком жанров"
        >
          Жанры
        </Link>
        <Link
          className={`nav__link_small ${
            isActive("/movie/genres") ? "active" : ""
          }`}
          to={`/movie/genres`}
          aria-label="Перейти на страницу со списком жанров"
        >
          <GenresIcon />
        </Link>
      </nav>
    );
  }
);
