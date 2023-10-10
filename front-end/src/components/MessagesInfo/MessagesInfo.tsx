import { useEffect } from "react";
import { ErrorMessage } from "../../types/ErrorMessage";
import { useState } from "react";
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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState(false)

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axiosPrivate.get(`/conversation/${id}`);
        if (response.status === 204) {
          console.log(response.data)
          setConversationListInfo(null);
        } else if (response.status >= 200 && response.status <= 305) {
          console.log(response.data)
          setConversationListInfo(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err as ErrorMessage);
        setIsLoading(false);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    socket?.on("new message", (data) => {
      console.log("AAAAAAAAAAAAAAAAA")
    } )

    fetchContactsData();
  }, [setNewMessage, newMessage]);



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
