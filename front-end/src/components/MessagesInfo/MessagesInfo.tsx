import { useEffect } from "react";
import { ErrorMessage } from "../../types/ErrorMessage";
import axios from "axios";
import { ConversationList } from "../ConversationList/ConversationList";
import { useUserContext } from "../../context/useUserContext";

export const MessagesInfo = () => {
  const {
    conversationListInfo,
    setConversationListInfo,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useUserContext();

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/conversation/6508695537fe843f89aa8444"
        );
        console.log(response)
        if (response.status >= 200 && response.status <= 305) {
          setConversationListInfo(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err as ErrorMessage);
        setIsLoading(false);
      }
    };

    fetchContactsData();
  }, [setConversationListInfo, setError, setIsLoading]);

  return (
    <>
      <ConversationList
        isLoading={isLoading}
        error={error}
        conversationListInfo={conversationListInfo}
      />
    </>
  );
};
