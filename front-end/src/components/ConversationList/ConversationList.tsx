import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";
import { ConversationListProps } from "../../types/ConversationListProps";
import { ErrorMessage } from "../../types/ErrorMessage";
import axios from "axios";
import { List } from "../List/List";

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [conversationListInfo, setConversationListInfo] = useState<
    null | ConversationListProps[]
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
      <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-[#1e1e1e] border-r-2 border-neutral-900 rounded-l-lg gap-4 pt-3">
        {isLoading ? (
          <div className="self-center justify-self-center">
            <Loading />
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-red-500 px-3">
                <h2>Something went wrong...</h2>
                <h2>{error.message}.</h2>
                <h2>Code: {error.code}</h2>
              </div>
            ) : (
              <>
                <h2 className="text-neutral-100 text-xl font-bold px-3">
                  Conversations
                </h2>
                <SearchBar
                  handleOnChange={setSearchValue}
                  searchValue={searchValue}
                />
                <List conversationListInfo={conversationListInfo} />
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
