import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../Loading/Loading";

type ErrorMessage = {
  code: string | number;
  message: string;
};

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [conversationListInfo, setConversationListInfo] = useState([]);
  const [error, setError] = useState<null | ErrorMessage>(null);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/conversation/6508695537fe843f89aa8444"
        );
        if (response.status > 200 && response.status < 305)
          setConversationListInfo(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setError(err as ErrorMessage);
      }
      setIsLoading(false);
    };

    fetchContactsData();
  }, []);


  return (
    <>
      <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-zinc-800 rounded-l-lg gap-4 pt-3 px-3">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <div className="text-red-600">
                <h2>Something went wrong...</h2>
                <h2>{error.message}.</h2>
                <h2>Code: {error.code}</h2>
              </div>
            ) : (
              <>
                <h2 className="text-neutral-100 text-xl font-semibold">
                  Conversations
                </h2>
                <SearchBar
                  handleOnChange={setSearchValue}
                  searchValue={searchValue}
                />
                <div></div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
