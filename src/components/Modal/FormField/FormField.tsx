import styles from "./FormField.module.scss";
import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  icon?: React.ReactNode;
  errorMessage?: string;
  serverError?: string | null;
};

export const FormField = React.memo(
  ({ children, icon, errorMessage, serverError }: TProps) => {
    return (
      <label
        className={`${styles.form} ${errorMessage ? styles.form__error : ""} ${
          serverError ? styles.form__error : ""
        }`}
      >
        {icon && <span className={styles.form__icon}>{icon}</span>}
        {React.cloneElement(children as React.ReactElement, {
          className: `${styles.form__input}`,
        })}
        {errorMessage && (
          <span className={styles.form__error_text}>{errorMessage}</span>
        )}
      </label>
    );
  }
);
