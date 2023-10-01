import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";
import { MessageText } from "../MessageText/MessageText";
import { MessageBody } from "../MessageBody/MessageBody";
import { ConversationProps } from "../../types/ConversationProps";
import { useUserContext } from "../../context/useUserContext";
import axios from "axios";

export const Conversation = () => {
  const [allMessages, setAllMessages] = useState<null | ConversationProps[]>(
    null
  );
  //Limpar essa parte do código depois
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { error, setError, isLoading, setIsLoading } = useUserContext();

  const [newMessageSent, setNewMessageSent] = useState(false);
  const { contactId } = useParams();
  const { state } = useLocation();
  const { contactName } = state;

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/${contactId}`
        );
        if (response.status >= 200 && response.status <= 305) {
          setAllMessages(response.data[0].messages);
          setProfilePicture(response.data[0].participants[0].profilePicture);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err as ErrorMessage);
      }
    };

    fetchConversationData();
  }, [contactId, setIsLoading, setError]);

  const fetchNewMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/new-message/${contactId}`
      );
      if (response.status >= 200 && response.status <= 305) {
        setAllMessages((prevMessages) =>
          (prevMessages ?? []).concat(response.data[0].messages[0])
        );
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err as ErrorMessage);
    }
  };

  const handleNewMessageSent = async () => {
    setNewMessageSent(true);
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
              />
            </>
          )}
        </>
      )}
    </section>
  );
};
