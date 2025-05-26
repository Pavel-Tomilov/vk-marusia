import styles from "./Logo.module.scss";
import React from "react";
import LogoIcon from "../../assets/icons/logo.svg?react";
import MarusiaIcon from "../../assets/icons/marusia.svg?react";

type TProps = {
  textFillClass?: string;
};

export const Logo = React.memo(({ textFillClass }: TProps) => {
  return (
    <div
      className={`${styles.logo} ${textFillClass ? "" : styles.logo__small}`}
    >
      <LogoIcon className={styles.logo__icon} />
      <MarusiaIcon
        className={`${styles.logo__text} ${styles[`${textFillClass}`]}`}
      />
    </div>
  );
});
