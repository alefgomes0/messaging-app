import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ConversationListProps } from "../../types/ConversationListProps";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";
import { MessageText } from "../MessageText/MessageText";

export const Conversation = () => {
  const [allMessages, setAllMessages] = useState<
    null | ConversationListProps[]
  >(null);
  const [error, setError] = useState<null | ErrorMessage>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { contactId } = useParams();
  const userId = "6508695537fe843f89aa8444";

  const { state } = useLocation();
  const { contactName } = state;

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${contactId}/messages`
        );
        console.log(response);
        if (response.status >= 200 && response.status <= 305) {
          setAllMessages(response.data);
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
              <div className="min-h-[70px] grid grid-cols-[65px_1fr] grid-rows-2 bg-[#1e1e1e] px-3">
                <div className="w-[45px] h-[45px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
                <h3 className="text-neutral-200 self-end font-bold">
                  {contactName}
                </h3>
              </div>
              <div className="bg-neutral-800"></div>
              <MessageText />
            </>
          )}
        </>
      )}
    </section>
  );
};
