import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";
import { MessageText } from "../MessageText/MessageText";
import { MessageBody } from "../MessageBody/MessageBody";
import { ConversationProps } from "../../types/ConversationProps";
import axios from "axios";

export const Conversation = () => {
  const [allMessages, setAllMessages] = useState<null | ConversationProps[]>(
    null
  );
  const [error, setError] = useState<null | ErrorMessage>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { contactId } = useParams();
  const { state } = useLocation();
  const { contactName } = state;


  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${contactId}/messages`
        );
        console.log(response.data[0].messages);
        if (response.status >= 200 && response.status <= 305) {
          setAllMessages(response.data[0].messages);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err as ErrorMessage);
      }
    };

    fetchConversationData();
  }, [contactId]);

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
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
              />
              <MessageText contactId={contactId as string}/>
            </>
          )}
        </>
      )}
    </section>
  );
};
