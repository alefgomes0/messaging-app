import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";
import { ConversationListProps } from "../../types/ConversationListProps";
import { List } from "../List/List";

export const ConversationList = ({
  isLoading,
  error,
  conversationListInfo,
}: ConversationListProps) => {
  const [searchValue, setSearchValue] = useState("");

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
                {conversationListInfo ? (
                  <List
                    conversationListInfo={conversationListInfo}
                    query={searchValue}
                  />
                ) : (
                  <p className="text-center text-neutral-200 opacity-80">
                    You don't have any active conversation. Click here to add
                    contacts and start a conversation.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
