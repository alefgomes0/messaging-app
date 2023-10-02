import { createContext, useState } from "react";
import { AuthProps } from "../types/AuthProps";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextValues = {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
};

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState({} as AuthProps);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
