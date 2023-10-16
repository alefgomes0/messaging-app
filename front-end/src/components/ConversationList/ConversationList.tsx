import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";
import { LastMessageWithContact } from "../../types/ConversationListProps";
import { ErrorMessage } from "../../types/ErrorMessage";
import { List } from "../List/List";
import { AddUserIcon } from "../svg/AddUserIcon";
import { useWindowSize } from "../../hooks/useWindowSize";

export const ConversationList = ({
  handleNotification,
  isLoading,
  error,
  conversationListInfo,
}: {
  handleNotification: () => void;
  isLoading: boolean;
  error: ErrorMessage | null;
  conversationListInfo: LastMessageWithContact[] | null;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const windowSize = useWindowSize();
  const isMobile = windowSize < 768;

  return (
    <>
      <section
        className={`grid grid-cols-1 ${
          isMobile && "col-start-2 col-end-3"
        } grid-rows-[auto_auto_1fr] bg-zinc-50 dark:bg-[#1e1e1e] border-r-2 border-zinc-400 dark:border-neutral-900 rounded-l-lg gap-4 pt-3`}
      >
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
                    handleNotification={handleNotification}
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
