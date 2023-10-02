import { useEffect } from "react";
import { ErrorMessage } from "../../types/ErrorMessage";
import { ConversationList } from "../ConversationList/ConversationList";
import { useUserContext } from "../../context/useUserContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const MessagesInfo = () => {
  const {
    conversationListInfo,
    setConversationListInfo,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useUserContext();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axiosPrivate.get(
          "http://localhost:3000/conversation/6508695537fe843f89aa8444"
        );
        console.log(response);
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
