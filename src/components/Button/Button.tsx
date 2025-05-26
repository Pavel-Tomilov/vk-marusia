import styles from "./Button.module.scss";
import React, { ReactNode } from "react";

interface TProps {
  text?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "blue" | "grey";
  isLoading?: boolean;
}

export const Button = React.memo(
  ({ text, icon, disabled = false, onClick, type = "blue" }: TProps) => {
    return (
      <button
        className={`${styles.button} ${styles[`button__${type}`]} ${
          icon ? styles.button__icon : styles.button__text
        }`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {text ? text : icon}
      </button>
    );
  }
);
