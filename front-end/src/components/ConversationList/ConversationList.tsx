import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";
import { ConversationListProps } from "../../types/ConversationListProps";
import { List } from "../List/List";
import { AddUserIcon } from "../svg/AddUserIcon";

export const ConversationList = ({
  isLoading,
  error,
  conversationListInfo,
}: ConversationListProps) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-zinc-50 dark:bg-[#1e1e1e] border-r-2 border-zinc-400 dark:border-neutral-900 rounded-l-lg gap-4 pt-3">
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
                <h2 className="text-neutral-700 dark:text-neutral-100 text-xl font-bold px-3">
                  Conversations
                </h2>
                <SearchBar
                  handleOnChange={setSearchValue}
                  searchValue={searchValue}
                  inputPlaceholder="Search a contact name"
                />
                {conversationListInfo ? (
                  <List
                    conversationListInfo={conversationListInfo}
                    query={searchValue}
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-neutral-200 opacity-80">
                    <p>You don't have any active conversation.</p>
                    <p>Click on this icon </p>
                    <span className="pointer-events-none">
                      <AddUserIcon width={12} height={12} />
                    </span>
                    <p>To add users and start a conversation</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
