import styles from "./CardGenre.module.scss";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import { useLazyLoadBackgroundImage } from "../../hooks/useLazyLoadBackgroundImage";

interface CardGenreProps {
  data: string;
}

export const CardGenre = ({ data }: CardGenreProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    import(`../../assets/images/${data.toLowerCase()}.webp`)
      .then((module) => {
        setBackgroundImage(module.default);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке изображения:", error);
      });
  }, [data]);

  const { isVisible, elementRef } = useLazyLoadBackgroundImage();

  usePreloadImages(isVisible ? backgroundImage || "" : "");

  return (
    <div
      ref={elementRef}
      className={styles.card__genre}
      style={{
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
      }}
    >
      <div className={styles.card__text}>
        {capitalizeFirstLetter(`${data}`)}
      </div>
    </div>
  );
};
