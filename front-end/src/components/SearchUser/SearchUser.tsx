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
        const response = await axiosPrivate.post(
          `/search-user/?q=${searchValue}`,
          {
            userId,
          }
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

  return (
    <section className="grid grid-cols-1 auto-rows-min bg-[#1e1e1e] border-r-2 border-neutral-900 rounded-l-lg gap-4 pt-3">
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
              {searchedUsersInfo?.map((user) => {
                return (
                  <ContactCard
                    contactId={user._id}
                    contactName={user.name}
                    profilePicture={user.profilePicture}
                    searchedUser={true}
                    email={user.email}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </section>
  );
};