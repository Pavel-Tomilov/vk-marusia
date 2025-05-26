import styles from "./AuthModal.module.scss";
import ReactModal from "react-modal";
import { useAuthModal } from "./AuthModalContext";
import { useState, useRef, useEffect } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Logo } from "../../Logo/Logo";
import { SuccessForm } from "../SuccessForm/SuccessForm";

ReactModal.setAppElement("#root");

export const AuthModal = () => {
  const { isVisible, hideModal, setUserName } = useAuthModal();
  const [authType, setAuthType] = useState<string>("auth");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const updateModalHeight = () => {
    if (contentRef.current) {
      setModalHeight(contentRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    updateModalHeight();
  }, [authType, isSuccess]);

  const handleClick = () => {
    setAuthType((prevState) => (prevState === "auth" ? "register" : "auth"));
    setIsSuccess(null);
  };

  const handleRegistrationSuccess = () => {
    setIsSuccess(true);
    setAuthType("register");
  };

  const handleLoginSuccess = (userName: string) => {
    const sessionDuration = 24 * 60 * 60 * 1000;
    const expirationTime = Date.now() + sessionDuration;
    setUserName(userName, expirationTime);
    hideModal();
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={hideModal}
      className={styles.modal}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
      style={{
        content: {
          height: modalHeight ? `${modalHeight}px` : "auto",
        },
      }}
      closeTimeoutMS={300}
    >
      <div className={styles.modal__content} ref={contentRef}>
        <button
          className={styles.modal__close}
          onClick={hideModal}
          aria-label="Закрыть форму"
        >
          ×
        </button>

        <div className={styles.modal__logo}>
          <Logo textFillClass="logo__text_black" />
        </div>

        {isSuccess && authType === "register" ? (
          <SuccessForm onButtonClick={handleClick} />
        ) : authType === "auth" && !isSuccess ? (
          <LoginForm handleLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm handleRegistrationSuccess={handleRegistrationSuccess} />
        )}

        <div className={styles.modal__form_info}>
          {!isSuccess && (
            <button className={styles.modal__form_btn} onClick={handleClick}>
              {authType === "auth" ? "Регистрация" : "У меня есть пароль"}
            </button>
          )}
        </div>
      </div>
    </ReactModal>
  );
};
