import styles from "./Footer.module.scss";
import VkIcon from "../../assets/icons/vk.svg?react";
import YouTubeIcon from "../../assets/icons/youtube.svg?react";
import OkIcon from "../../assets/icons/ok.svg?react";
import TelegramIcon from "../../assets/icons/telegram.svg?react";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container ">
        <div className={styles.footer__container}>
          <ul className={styles.footer__list}>
            <li>
              <a
                className={styles.footer__link}
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Посетить нашу страницу в VK"
              >
                <VkIcon width={36} height={36} />
              </a>
            </li>
            <li>
              <a
                className={styles.footer__link}
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Посетить наш канал на YouTube"
              >
                <YouTubeIcon width={36} height={36} />
              </a>
            </li>
            <li>
              <a
                className={styles.footer__link}
                href="https://ok.ru"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Посетить нашу страницу в Одноклассниках"
              >
                <OkIcon width={36} height={36} />
              </a>
            </li>
            <li>
              <a
                className={styles.footer__link}
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Посетить наш канал в Telegram"
              >
                <TelegramIcon width={36} height={36} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
