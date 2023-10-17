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
import { useWindowSize } from "../../hooks/useWindowSize";

export const Conversation = () => {
  const [allMessages, setAllMessages] = useState<null | ConversationProps[]>(
    null
  );
  //Limpar essa parte do código depois
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { error, setError, isLoading, setIsLoading } = useUserContext();
  const [newMessageSent, setNewMessageSent] =
    useState<null | ConversationProps>(null);
  const { userId } = useParams();
  const { contactId } = useParams();
  const { state } = useLocation();
  const { conversationId } = state;
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();
  const windowSize = useWindowSize();
  const isMobile = windowSize < 768;

  const fetchConversationData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/messages/${userId}/${contactId}`
      );
      if (response.status === 204) {
        setAllMessages(null);
        setProfilePicture(null);
      } else if (response.status === 200) {
        setAllMessages(response.data.allMessages[0].messages);
        setProfilePicture(
          response.data.allMessages[0].participants[0].profilePicture
        );
      }
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setAllMessages(null);
      setIsLoading(false);
      setError(err as ErrorMessage);
    }
  };

  useEffect(() => {
    fetchConversationData();
    if (!socket) return;
    socket.emit("join chat", conversationId);
    socket.on("message received", (newMessageReceived: ConversationProps) => {
      setAllMessages((prevMessages) =>
        (prevMessages ?? []).concat(newMessageReceived)
      );
    });

    return () => {
      socket.off("message received");
      socket.off("join chat", conversationId);
    };
  }, [contactId, conversationId, socket]);

  const fetchNewMessage = async () => {
    try {
      const response = await axiosPrivate.put(
        `http://localhost:3000/new-message/${contactId}`,
        {
          userId,
        }
      );
      if (response.status >= 200 && response.status <= 305) {
        setAllMessages((prevMessages) =>
          (prevMessages ?? []).concat(response.data.messages[0])
        );
        setIsLoading(false);
        setNewMessageSent(response.data.messages[0]);
        socket?.emit("new message", response.data.messages[0], userId);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err as ErrorMessage);
    }
  };

  return (
    <section
      className={`h-[calc(100dvh-48px)] grid grid-cols-1 grid-rows-[auto_1fr_auto] ${
        isMobile && "fixed z-[50]  w-[100vw] top-50 bottom-50 left-0"
      } bg-zinc-100 dark:bg-neutral-800`}
    >
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
                contactId={contactId as string}
                allMessages={allMessages}
                profilePicture={profilePicture}
                newMessageSent={newMessageSent}
              />
              <MessageText
                contactId={contactId as string}
                handleMessageSent={() => fetchNewMessage()}
                setError={setError}
                conversationId={conversationId}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};
