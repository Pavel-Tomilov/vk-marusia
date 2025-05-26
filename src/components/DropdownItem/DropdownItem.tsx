import styles from "./DropdownItem.module.scss";
import { SingleMovie } from "../../models";
import { MovieInfo } from "../MovieInfo/MovieInfo";

interface DropdownItemProps {
  data: SingleMovie;
}

export const DropdownItem = ({ data }: DropdownItemProps) => {
  return (
    <div className={styles.item__wrapper}>
      <div className={styles.item__poster}>
        <img src={data.posterUrl} />
      </div>
      <div>
        <MovieInfo movie={data} size="small" />
        <h2 className={styles.item__title}>{data.title}</h2>
      </div>
    </div>
  );
};
