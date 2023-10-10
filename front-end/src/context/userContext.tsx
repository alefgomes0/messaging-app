import { useEffect, SetStateAction, createContext, useState } from "react";
import { LastMessageWithContact } from "../types/ConversationListProps";
import { ErrorMessage } from "../types/ErrorMessage";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextValues = {
  conversationListInfo: null | LastMessageWithContact[];
  setConversationListInfo: React.Dispatch<
    SetStateAction<LastMessageWithContact[] | null>
  >;
  error: null | ErrorMessage;
  setError: React.Dispatch<React.SetStateAction<null | ErrorMessage>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export const UserContext = createContext({} as UserContextValues);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [conversationListInfo, setConversationListInfo] = useState<
    null | LastMessageWithContact[]
  >(null);
  const [error, setError] = useState<null | ErrorMessage>(null);
  const [isLoading, setIsLoading] = useState(true);



  theme === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  return (
    <UserContext.Provider
      value={{
        conversationListInfo,
        setConversationListInfo,
        error,
        setError,
        isLoading,
        setIsLoading,
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
