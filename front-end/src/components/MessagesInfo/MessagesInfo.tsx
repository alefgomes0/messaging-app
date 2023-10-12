import { useEffect, useState } from "react";
import { ErrorMessage } from "../../types/ErrorMessage";
import { ConversationList } from "../ConversationList/ConversationList";
import { useUserContext } from "../../context/useUserContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../context/useSocket";

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
  const [notification, setNotification] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();

  const fetchContactsData = async () => {
    try {
      const response = await axiosPrivate.get(`/conversation/${id}`);
      if (response.status === 204) {
        console.log(response.data);
        setConversationListInfo(null);
      } else if (response.status >= 200 && response.status <= 305) {
        console.log(response.data);
        setConversationListInfo(response.data);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err as ErrorMessage);
      setIsLoading(false);
      navigate("/", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    fetchContactsData();

    socket?.on("teste", async () => {
      fetchContactsData();
    });

    return () => {
      socket?.removeListener("teste");
    };
  }, [socket, notification]);

  return (
    <>
      <ConversationList
        handleNotification={() => setNotification(!notification)}
        isLoading={isLoading}
        error={error}
        conversationListInfo={conversationListInfo}
      />
    </>
  );
};
