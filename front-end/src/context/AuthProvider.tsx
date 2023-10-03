import { createContext, useState } from "react";
import { AuthProps } from "../types/AuthProps";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextValues = {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
  persist: string | boolean;
  setPersist: React.Dispatch<React.SetStateAction<string | boolean>>;
};

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState({} as AuthProps);

  const persistFromLocalStorage = localStorage.getItem("persist");
  const initialPersistState = persistFromLocalStorage
    ? JSON.parse(persistFromLocalStorage) || false
    : false;
  const [persist, setPersist] = useState<string | boolean>(initialPersistState);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
