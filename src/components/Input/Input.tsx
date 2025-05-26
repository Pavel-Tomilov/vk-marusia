import styles from "./Input.module.scss";
import React from "react";

type TProps = {
  value: string | undefined;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme?: "light" | "dark";
  icon?: React.ReactNode;
};

export const Input = React.memo(
  ({ value, placeholder, theme = "light", icon, onChange }: TProps) => {
    return (
      <div
        className={`input__wrapper ${styles.input__container} ${
          styles[`input__container_${theme}`]
        }`}
      >
        {icon && <span className={styles.input__icon}>{icon}</span>}
        <input
          className={`${styles.input} ${styles[`input__${theme}`]}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
);
