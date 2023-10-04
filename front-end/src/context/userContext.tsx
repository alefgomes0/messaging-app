import { SetStateAction, createContext, useState } from "react";
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
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext({} as UserContextValues);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [conversationListInfo, setConversationListInfo] = useState<
    null | LastMessageWithContact[]
  >(null);
  const [error, setError] = useState<null | ErrorMessage>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        conversationListInfo,
        setConversationListInfo,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
