import styles from "./AccountPage.module.scss";
import { User } from "../../models";
import { useState, useMemo } from "react";
import { FetchFavorites } from "./Favorites/FetchFavorites";
import { Settings } from "./Settings/Settings";
import UserLogo from "../../assets/icons/setting.svg?react";
import FavoriteLogo from "../../assets/icons/favorite.svg?react";

interface AccountPageProps {
  account: User;
}
export const AccountPage = ({ account }: AccountPageProps) => {
  const favoriteLogo = useMemo(() => <FavoriteLogo />, []);
  const userLogo = useMemo(() => <UserLogo />, []);

  const [activeTab, setActiveTab] = useState<"favorites" | "settings">(
    "favorites"
  );

  const handleTabChange = (tab: "favorites" | "settings") => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.account}>
      <div className={`container ${styles.account__container}`}>
        <h2 className={styles.account__title}>Мой аккаунт</h2>
        <nav>
          <ul className={styles.account__list}>
            <li>
              <a
                className={`tab__link ${
                  activeTab === "favorites" ? "active" : ""
                }`}
                onClick={() => handleTabChange("favorites")}
              >
                <span className={styles.account__icon}>{favoriteLogo}</span>
                <span className={styles.tab__text}>Избранные фильмы</span>
                <span className={styles.tab__text_short}>Избранное</span>
              </a>
            </li>
            <li>
              <a
                className={`tab__link ${
                  activeTab === "settings" ? "active" : ""
                }`}
                onClick={() => handleTabChange("settings")}
                data-short-label="Избранное"
              >
                <span className={styles.account__icon}>{userLogo}</span>
                <span className={styles.tab__text}>Настройка аккаунта</span>
                <span className={styles.tab__text_short}>Настройки</span>
              </a>
            </li>
          </ul>
        </nav>

        {activeTab === "favorites" ? (
          <FetchFavorites favoriteIds={account.favorites} />
        ) : (
          <Settings data={account} />
        )}
      </div>
    </section>
  );
};
