import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";

type ErrorMessage = {
  code: string | number;
  message: string;
};

type ConversationListProps = {
  messages: [
    {
      date: string;
      message: string;
      _id: string;
      time: string;
    }
  ];
  participants: [
    {
      name: string;
      _id: string;
    }
  ];
};

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
      <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-[#333] rounded-l-lg gap-4 pt-3">
        {isLoading ? (
          <Loading />
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
                <h2 className="text-neutral-100 text-xl font-semibold px-3">
                  Conversations
                </h2>
                <SearchBar
                  handleOnChange={setSearchValue}
                  searchValue={searchValue}
                />
                <div>
                  {conversationListInfo?.map((conversation) => {
                    return (
                      <div
                        className="min-h-[90px] w-full grid grid-cols-[min_150px] grid-rows-2 items-center gap-x-4 gap-y-1 text-neutral-200 rounded-md hover:bg-neutral-600 px-3"
                        key={conversation.participants[0]._id}
                      >
                        <div className="w-[58px] h-[58px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
                        <div className="self-end flex justify-between col-start-2 col-end-3 row-start-1 row-end-2">
                          <h4>{conversation.participants[0].name}</h4>
                          <h6 className="text-xs opacity-60">16:20</h6>
                        </div>
                        <p className="truncate text-sm self-start col-start-2 col-end-3 row-start-2 row-end-3 opacity-70">
                          {conversation.messages[0].message}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
