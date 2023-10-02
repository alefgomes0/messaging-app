import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextValues = {
  auth: object;
  setAuth: React.Dispatch<React.SetStateAction<object>>;
};

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
