import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";
import { MessageText } from "../MessageText/MessageText";
import { MessageBody } from "../MessageBody/MessageBody";
import { ConversationProps } from "../../types/ConversationProps";
import { useUserContext } from "../../context/useUserContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useSocket } from "../../context/useSocket";

export const Conversation = () => {
  const [allMessages, setAllMessages] = useState<null | ConversationProps[]>(
    null
  );
  //Limpar essa parte do código depois
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { error, setError, isLoading, setIsLoading } = useUserContext();
  const [newMessageSent, setNewMessageSent] =
    useState<null | ConversationProps>(null);
  const { contactId } = useParams();
  const { userId } = useParams();
  const { state } = useLocation();
  const { contactName, conversationId } = state;
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();

  const fetchConversationData = async () => {
    try {
      const response = await axiosPrivate.get(`/messages/${contactId}`);
      if (response.data.success) {
        setAllMessages(response.data.allMessages[0].messages);
        setProfilePicture(
          response.data.allMessages[0].participants[0].profilePicture
        );
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err as ErrorMessage);
    }
  };

  useEffect(() => {
    fetchConversationData();
    if (!socket) return;
    socket.emit("setup", userId);
    socket.emit("join chat", conversationId);
    socket.on("message received", (newMessageReceived: ConversationProps) => {
      setAllMessages((prevMessages) =>
        (prevMessages ?? []).concat(newMessageReceived)
      );
    });

    return () => {
      socket.off("message received");
    };
  }, []);

  const fetchNewMessage = async () => {
    try {
      const response = await axiosPrivate.get(
        `http://localhost:3000/new-message/${contactId}`
      );
      if (response.status >= 200 && response.status <= 305) {
        setAllMessages((prevMessages) =>
          (prevMessages ?? []).concat(response.data[0].messages[0])
        );
        setIsLoading(false);
        console.log(response.data[0].messages[0]);
        setNewMessageSent(response.data[0].messages[0]);
        socket?.emit("new message", response.data[0].messages[0], userId);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err as ErrorMessage);
    }
  };

  const handleNewMessageSent = async () => {
    fetchNewMessage();
  };

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-neutral-800">
      {isLoading ? (
        <div className="row-start-2 row-end-3 self-center justify-self-center">
          <Loading />
        </div>
      ) : (
        <>
          {error ? (
            <div className="justify-self-center text-red-500 px-3 pt-4">
              <h2>Something went wrong...</h2>
              <h2>{error.message}.</h2>
              <h2>Code: {error.code}</h2>
            </div>
          ) : (
            <>
              <MessageBody
                contactName={contactName}
                contactId={contactId as string}
                allMessages={allMessages}
                profilePicture={profilePicture}
                newMessageSent={newMessageSent}
              />
              <MessageText
                contactId={contactId as string}
                handleMessageSent={() => handleNewMessageSent()}
                setError={setError}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};
