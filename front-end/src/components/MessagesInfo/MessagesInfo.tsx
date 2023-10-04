import { useEffect } from "react";
import axios from "../../api/axios";
import { ErrorMessage } from "../../types/ErrorMessage";
import { ConversationList } from "../ConversationList/ConversationList";
import { useUserContext } from "../../context/useUserContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

type MessagesInfoProps = {
  id: string;
};

export const MessagesInfo = ({ id }: MessagesInfoProps) => {
  const {
    conversationListInfo,
    setConversationListInfo,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useUserContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axiosPrivate.get(`/conversation/${id}`);
        if (response.status === 204) {
          setConversationListInfo(null);
        } else if (response.status >= 200 && response.status <= 305) {
          setConversationListInfo(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err as ErrorMessage);
        setIsLoading(false);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    fetchContactsData();
  }, []);

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
