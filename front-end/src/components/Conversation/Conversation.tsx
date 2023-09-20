import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ConversationListProps } from "../../types/ConversationListProps";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";

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
      ) : <></> }
    </section>
  )
};
