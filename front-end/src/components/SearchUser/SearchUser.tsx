import { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../../types/ErrorMessage";
import { Loading } from "../Loading/Loading";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ContactCard } from "../ContactCard/ContactCard";

type SearchedUserInfo = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
};

export const SearchUser = () => {
  const [searchValue, setSearchValue] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [searchedUsersInfo, setSearchedUsersInfo] = useState<
    null | SearchedUserInfo[]
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | ErrorMessage>(null);
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setIsLoading(true);
    const fetchSearchedUser = async () => {
      try {
        const response = await axiosPrivate.get(
          `/search-user/${userId}/?q=${searchValue}`
        );
        if (response.data.success) {
          setIsLoading(false);
          setSearchedUsersInfo(response.data.users);
          console.log(response.data);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err as ErrorMessage);
      }
    };

    fetchSearchedUser();
  }, [searchValue, userId, axiosPrivate]);

  const noUsersFound = searchedUsersInfo?.length === 0;

  const createConversation = async (contactId: string) => {
    try {
      const response = await axiosPrivate.post("/conversation", {
        userId,
        contactId,
      });

      console.log(response.data);
      setConversationId(response.data);
      return response.data as string;
    } catch (err) {
      setError(err as ErrorMessage);
      return "error";
    }
  };

  return (
    <section className="grid grid-cols-1 auto-rows-min bg-zinc-50 dark:bg-[#1e1e1e] border-r-2 border-neutral-900 rounded-l-lg gap-4 pt-3">
      <SearchBar
        inputPlaceholder="Search for a user name or email"
        searchValue={searchValue}
        handleOnChange={setSearchValue}
      />
      {isLoading ? (
        <div className="row-start-2 row-end-3 self-center justify-self-center">
          {searchValue && <Loading />}
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
              {noUsersFound ? (
                <p className="opacity-80 text-sm text-neutral-200 pl-3">
                  No user found
                </p>
              ) : (
                <>
                  {searchedUsersInfo?.map((user) => {
                    return (
                      <div
                        key={user.email}
                        onClick={() => createConversation(user._id)}
                      >
                        <ContactCard
                          key={user._id}
                          contactId={user._id}
                          contactName={user.name}
                          conversationId={conversationId}
                          profilePicture={user.profilePicture}
                          searchedUser={true}
                          email={user.email}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
