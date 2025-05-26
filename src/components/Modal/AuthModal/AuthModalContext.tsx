import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthModalContextType {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  userName: string | null;
  setUserName: (name: string | null, expirationTime?: number) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserNameState] = useState<string | null>(null);

  const setUserName = (name: string | null, expirationTime?: number) => {
    setUserNameState(name);
    if (name) {
      localStorage.setItem("userName", name);
      if (expirationTime) {
        localStorage.setItem("sessionExpiration", expirationTime.toString());
      }
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("sessionExpiration");
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const sessionExpiration = localStorage.getItem("sessionExpiration");
    if (storedUserName && sessionExpiration) {
      const now = Date.now();
      if (now < parseInt(sessionExpiration, 10)) {
        setUserNameState(storedUserName);
      } else {
        setUserNameState(null);
        localStorage.removeItem("userName");
        localStorage.removeItem("sessionExpiration");
      }
    }
  }, []);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return (
    <AuthModalContext.Provider
      value={{
        isVisible,
        showModal,
        hideModal,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
