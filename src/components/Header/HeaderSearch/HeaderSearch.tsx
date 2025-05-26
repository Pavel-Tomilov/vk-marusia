import styles from "./HeaderSearch.module.scss";
import Api from "../../../api/api";
import { Link } from "react-router-dom";
import { Input } from "../../Input/Input";
import SearchIcon from "../../../assets/icons/search.svg?react";
import SearchBtnIcon from "../../../assets/icons/search-white.svg?react";
import CloseIcon from "../../../assets/icons/close.svg?react";
import { DropdownItem } from "../../DropdownItem/DropdownItem";
import { Movies } from "../../../models";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export const HeaderSearch = React.memo(() => {
  const searchIcon = useMemo(() => <SearchIcon />, []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchParam, setSearchParam] = useState("");
  const [movies, setMovies] = useState<Movies>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value);
    setIsTyping(true);
  };

  const fetchMovies = useCallback(async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const result = await Api.getMoviesByTitle(searchTerm);
      setMovies(result.slice(0, 5));
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    if (searchParam.trim()) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    const debounceTimeout = setTimeout(() => {
      if (searchParam.length > 0) {
        fetchMovies(searchParam.trim());
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchParam, fetchMovies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMovieClick = () => {
    setSearchParam("");
    setIsVisible(false);
    closeSearch();
  };

  const handleClearSearch = () => {
    setSearchParam("");
    setMovies([]);
    setIsVisible(false);
  };

  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
  };

  return (
    <div className={styles.search} ref={dropdownRef}>
      <SearchBtnIcon
        className={`${styles.search__icon} nav__link_small`}
        onClick={toggleSearch}
      />

      <Input
        value={searchParam}
        placeholder="Поиск"
        theme="dark"
        onChange={handleSearchChange}
        icon={searchIcon}
      />

      {searchParam.length > 0 && (
        <button
          type="button"
          className={styles.search__close}
          onClick={handleClearSearch}
          aria-label="Очистить поиск"
        >
          <CloseIcon />
        </button>
      )}

      {isVisible && !isTyping && (
        <ul className={styles.search__dropdown}>
          {isLoading && <li className={styles.search__loading}>Загрузка...</li>}
          {!isLoading && movies.length === 0 && (
            <li className={styles["search__no-results"]}>
              По вашему запросу ничего не найдено :(
            </li>
          )}
          {!isLoading &&
            movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={`/movie/${movie.id}`}
                  className="search__link"
                  aria-label={`Перейти к информации о фильме ${movie.title}`}
                  onClick={() => handleMovieClick()}
                >
                  <DropdownItem data={movie} />
                </Link>
              </li>
            ))}
        </ul>
      )}

      <ReactModal
        isOpen={isSearchActive}
        onRequestClose={toggleSearch}
        className={styles["modal-search"]}
        overlayClassName="overlay overlay__search"
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={300}
      >
        <div className={styles["modal-search__content"]}>
          <Input
            value={searchParam}
            placeholder="Поиск"
            theme="dark"
            onChange={handleSearchChange}
            icon={searchIcon}
          />

          <button
            type="button"
            className={styles["modal-search__close"]}
            onClick={closeSearch}
            aria-label="Закрыть поиск"
          >
            <CloseIcon />
          </button>
          {isVisible && !isTyping && (
            <ul className={styles.search__dropdown_new}>
              {isLoading && (
                <li className={styles.search__loading}>Загрузка...</li>
              )}
              {!isLoading && movies.length === 0 && (
                <li className={styles["search__no-results"]}>
                  По вашему запросу ничего не найдено :(
                </li>
              )}
              {!isLoading &&
                movies.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="search__link"
                      aria-label={`Перейти к информации о фильме ${movie.title}`}
                      onClick={() => handleMovieClick()}
                    >
                      <DropdownItem data={movie} />
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </ReactModal>
    </div>
  );
});
