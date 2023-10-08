import { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { axiosPrivate } from "../../api/axios";
import { useParams } from "react-router-dom";

export const SearchUser = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchSearchedUser = async () => {
      const response = await axiosPrivate.post(`/search-user/?q=${searchValue}`, {
        userId
      })
    }
  }, [searchValue, userId])

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-[#1e1e1e] border-r-2 border-neutral-900 rounded-l-lg gap-4 pt-3">
      <SearchBar
        inputPlaceholder="Search for a user by the name or email"
        searchValue={searchValue}
        handleOnChange={setSearchValue}
      />
    </section>
  );
};
