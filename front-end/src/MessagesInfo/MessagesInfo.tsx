import { useEffect, useState } from "react";
import { LastMessageWithContact } from "../types/ConversationListProps";
import { ErrorMessage } from "../types/ErrorMessage";
import axios from "axios";
import { ConversationList } from "../components/ConversationList/ConversationList";

export const MessagesInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [conversationListInfo, setConversationListInfo] = useState<
    null | LastMessageWithContact[]
  >(null);
  const [error, setError] = useState<null | ErrorMessage>(null);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/conversation/6508695537fe843f89aa8444"
        );
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
